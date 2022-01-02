import React from "react";
import { Empty, Steps } from "antd";
import { newContextComponents } from "@drizzle/react-components";
import { useContractData } from "../../utils/useContractData";
import {
	contractStateEnum,
	getContractState,
	getStateIdx,
} from "../../utils/ContractStates";
import { getEthValue } from "../../utils/getEthValue";

const { ContractData } = newContextComponents;

const getIsCancelled = ({ itemIdx, selectedIdx, total }, state) =>
	[contractStateEnum.ReviewsAndRatings, contractStateEnum.Done].includes(
		getContractState(state)
	) &&
	selectedIdx !== total &&
	itemIdx === selectedIdx;

const getTitle = ({ itemIdx, selectedIdx, total }, state) => {
	switch (true) {
		case itemIdx < selectedIdx:
			return "Finished";
		// TODO: add handling for different states
		case itemIdx === selectedIdx:
			if (getContractState(state) === contractStateEnum.TaskEvaluation)
				return "Evaluating";
			if (getContractState(state) === contractStateEnum.TaskInProgress)
				return "In Progress";
			if (getIsCancelled({ itemIdx, selectedIdx, total }, state))
				return "Cancelled";
			return "To do";
		default:
			return "To do";
	}
};

function getCurrentStepIdx(taskIdx, state) {
	const payForTaskStateIdx = getStateIdx(state.PayForTask);
	const hasStartedImplementingTasks =
		state > payForTaskStateIdx || (state >= payForTaskStateIdx && taskIdx > 0);
	return hasStartedImplementingTasks ? Number(taskIdx) : -1;
}

export function Tasks({ drizzle, drizzleState }) {
	const { taskIdx, state } = useContractData(
		{ drizzle, drizzleState },
		"taskIdx",
		"state"
	);

	return (
		<div style={{ padding: "1rem" }}>
			<h2>Tasks</h2>
			<ContractData
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='getTasks'
				render={(items) => {
					if (!items.length) return <Empty description='no tasks' />;
					const currentStepIdx = getCurrentStepIdx(taskIdx, state);

					return (
						<Steps direction='vertical' size='small' current={currentStepIdx}>
							{items.map(({ title, amount }, i) => {
								const stepTitle = getTitle(
									{
										itemIdx: i,
										selectedIdx: currentStepIdx,
										total: items.length,
									},
									state
								);
								const cancelledStateProps = getIsCancelled(
									{
										itemIdx: i,
										selectedIdx: currentStepIdx,
										total: items.length,
									},
									state
								)
									? { status: "error" }
									: {};

								return (
									<Steps.Step
										key={title}
										title={stepTitle}
										{...cancelledStateProps}
										description={`${title} - ${getEthValue(drizzle, amount)}`}
									/>
								);
							})}
						</Steps>
					);
				}}
			/>
		</div>
	);
}
