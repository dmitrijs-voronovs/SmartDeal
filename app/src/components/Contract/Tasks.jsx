import React from "react";
import { Empty, Steps } from "antd";
import { newContextComponents } from "@drizzle/react-components";
import { useContractData } from "../../utils/useContractData";
import {
	contractStateEnum,
	contractStates,
	getContractState,
	getStateIdx,
} from "../../utils/ContractStates";

const { ContractData } = newContextComponents;

const getIsCancelled = ({ itemIdx, selectedIdx, total }, state) =>
	[
		contractStateEnum.ReviewsAndRatings,
		contractStateEnum.MoneyToAnotherParty,
		contractStateEnum.Done,
	].includes(getContractState(state)) &&
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

export function Tasks({ drizzle, drizzleState }) {
	console.log({ drizzle, drizzleState });
	const { taskIdx, state } = useContractData(
		{ drizzle, drizzleState },
		"taskIdx",
		"state"
	);
	console.log({ taskIdx, state });

	return (
		<div>
			<h2>Tasks</h2>
			<ContractData
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='getTasks'
				render={(items) => {
					if (!items.length) return <Empty description='no tasks' />;

					const payForTaskStateIdx = getStateIdx(state.PayForTask);
					const hasStartedImplementingTasks =
						state > payForTaskStateIdx ||
						(state >= payForTaskStateIdx && taskIdx > 0);
					const current = hasStartedImplementingTasks ? Number(taskIdx) : -1;

					return (
						<Steps direction='vertical' size='small' current={current}>
							{items.map(({ title, amount }, i) => {
								return (
									<Steps.Step
										key={title}
										title={getTitle(
											{ itemIdx: i, selectedIdx: current, total: items.length },
											state
										)}
										{...(getIsCancelled(
											{ itemIdx: i, selectedIdx: current, total: items.length },
											state
										)
											? { status: "error" }
											: {})}
										description={`${title} - ${amount} Wei`}
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
