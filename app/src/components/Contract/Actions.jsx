import React, { useState } from "react";
import { useContractData } from "../../utils/useContractData";
import { Divider } from "antd";
import { customFormRender } from "../../utils/CustomFormRender";
import { newContextComponents } from "@drizzle/react-components";
import { contractStateEnum } from "../../utils/ContractStates";
import { StateDivider } from "./StateDivider";
import { isMetamask } from "../../utils/isMetamask";
import { UserSelector } from "./UserSelector";

const { ContractForm } = newContextComponents;

const gasPrice = 2000000000;
const gas = 6721975;

export const amountField = "amount (ETH)";

export function Actions({ drizzle, drizzleState }) {
	const [selectedUserId, setSelectedUserId] = useState(0);

	const {
		getProtectionValue: protectionValue,
		getCurrentTask: currentTask,
		state: stateIdx,
	} = useContractData(
		{
			drizzle,
			drizzleState,
		},
		"getProtectionValue",
		"getCurrentTask",
		"state"
	);
	const accounts = drizzleState.accounts;
	const from = accounts[selectedUserId];

	return (
		<div style={{ background: "white", padding: "1rem" }}>
			<h2>Actions</h2>
			{!isMetamask && (
				<UserSelector
					onChange={(val) => {
						setSelectedUserId(val);
					}}
				/>
			)}
			<StateDivider
				currentStateIdx={stateIdx}
				stateNames={[contractStateEnum.Init]}
			/>
			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='addTask'
				key='addTask'
				sendArgs={{
					from,
					gasPrice,
					gas,
				}}
				render={customFormRender("Add task", {
					drizzle,
					labels: ["name", amountField],
				})}
			/>
			<Divider dashed />
			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='startDeal'
				key='startDeal'
				sendArgs={{
					from,
					gasPrice,
					gas,
				}}
				render={customFormRender("Start deal")}
			/>
			<StateDivider
				currentStateIdx={stateIdx}
				stateNames={[
					contractStateEnum.ProtectionFromClient,
					contractStateEnum.ProtectionFromAgent,
				]}
			/>

			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='sendProtectionMoney'
				key='sendProtectionMoney'
				sendArgs={{
					from,
					gasPrice,
					gas,
					// value: Number(protectionValue),
					value: protectionValue,
				}}
				render={customFormRender("Send protection money")}
			/>
			<StateDivider
				currentStateIdx={stateIdx}
				stateNames={[contractStateEnum.PayForTask]}
			/>

			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='payForTask'
				key='payForTask'
				sendArgs={{
					from,
					gasPrice,
					gas,
					value: currentTask?.amount,
				}}
				render={customFormRender("Pay for task")}
			/>
			<StateDivider
				currentStateIdx={stateIdx}
				stateNames={[contractStateEnum.TaskInProgress]}
			/>

			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='sendTaskToRevision'
				key='sendTaskToRevision'
				sendArgs={{
					from,
					gasPrice,
					gas,
				}}
				render={customFormRender("Send task to revision")}
			/>
			<Divider dashed />
			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='cancelDeal'
				key='cancelDeal'
				sendArgs={{
					from,
					gasPrice,
					gas,
				}}
				render={customFormRender("Cancel deal")}
			/>
			<StateDivider
				currentStateIdx={stateIdx}
				stateNames={[contractStateEnum.TaskEvaluation]}
			/>

			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='acceptTask'
				key='acceptTask'
				sendArgs={{
					from,
					gasPrice,
					gas,
				}}
				render={customFormRender("Accept task")}
			/>
			<Divider dashed />
			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='declineTask'
				key='declineTask'
				sendArgs={{
					from,
					gasPrice,
					gas,
				}}
				render={customFormRender("Decline task")}
			/>
			<StateDivider
				currentStateIdx={stateIdx}
				stateNames={[
					contractStateEnum.ReviewsAndRatings,
					contractStateEnum.ProtectionMoneyBack,
				]}
			/>
			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='writeReview'
				key='writeReview'
				sendArgs={{
					from,
					gasPrice,
					gas,
				}}
				render={customFormRender("Write review", { stateIdx })}
			/>
			<StateDivider
				currentStateIdx={stateIdx}
				stateNames={[contractStateEnum.Done]}
			/>
		</div>
	);
}
