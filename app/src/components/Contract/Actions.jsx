import React, { useState } from "react";
import { useContractData } from "../../utils/useContractData";
import { Col, Divider, Row, Select } from "antd";
import { userIds } from "../../utils/UserIds";
import { customFormRender } from "../../utils/CustomFormRender";
import { newContextComponents } from "@drizzle/react-components";
import { contractStateEnum } from "../../utils/ContractStates";
import { StateDivider } from "./StateDivider";

const { ContractForm } = newContextComponents;

const gasPrice = 2000000000;
const gas = 6721975;

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
			<div
				style={{
					position: "sticky",
					top: 0,
					background: "rgba(255,255,255,.9)",
					zIndex: 99,
				}}
			>
				<Row style={{ padding: "1rem 0" }}>
					<Col span={6} style={{ textAlign: "right", paddingRight: ".5rem" }}>
						Select a user:
					</Col>
					<Col span={14}>
						<Select
							onChange={(val) => {
								setSelectedUserId(val);
							}}
							options={[
								{ label: "Creator", value: userIds.creator },
								{
									label: "Agent",
									value: userIds.agent,
								},
								{ label: "Client", value: userIds.client },
							]}
							defaultValue={userIds.creator}
						/>
					</Col>
				</Row>
			</div>
			<StateDivider
				currentStateIdx={stateIdx}
				stateNames={[contractStateEnum.Init]}
			/>
			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='addTask'
				sendArgs={{
					from,
					gasPrice,
					gas,
				}}
				labels={["name", "amount"]}
				render={customFormRender("Add task")}
			/>
			<Divider dashed />
			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='startDeal'
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
				sendArgs={{
					from,
					gasPrice,
					gas,
				}}
				render={customFormRender("Write review", stateIdx)}
			/>
			<StateDivider
				currentStateIdx={stateIdx}
				stateNames={[contractStateEnum.Done]}
			/>
		</div>
	);
}
