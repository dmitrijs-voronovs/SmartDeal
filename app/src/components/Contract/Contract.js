import {newContextComponents} from "@drizzle/react-components";
import {Select, Space,} from "antd";
import React, {useEffect, useState} from "react";
import {Info} from "./Info";
import {customFormRender} from "../../utils/CustomFormRender";
import {Tasks} from "./Tasks";
import {Actors} from "./Actors";

const { ContractForm } = newContextComponents;

export const userIds = {
	creator: 0,
	agent: 1,
	client: 2,
};

// TODO: implement events for every state transition ??? or check how to track state change
export const Contract = ({ drizzle, drizzleState }) => {
	const [currentTaskKey, setCurrentTaskKey] = useState([]);
	const [protectionValueKey, setProtectionValueKey] = useState(null);

	const [selectedUserId, setSelectedUserId] = useState(0);

	useEffect(() => {
		console.log("______________NEW__________");
		const contract = drizzle.contracts.SmartDeal;
		// get and save the key for the variable we are interested in
		// const dataKey = contract.methods["getTasks"].cacheCall();
		// const taskIdKey = contract.methods.taskIdx.cacheCall();
		// setTaskIdKey(taskIdKey);
		// setCurrentTaskKey(contract.methods.getCurrentTask.cacheCall());
		// setProtectionValueKey(contract.methods.getProtectionValue.cacheCall());
	}, [drizzle]);

	return (
		<div className='App'>
			<Info drizzle={drizzle} drizzleState={drizzleState}/>
			<Actors drizzle={drizzle} drizzleState={drizzleState}/>
			<Tasks drizzle={drizzle} drizzleState={drizzleState} />
			<div>
				<h2>Actions</h2>
				<Space>
					<p>Select a user</p>
					<Select
						onChange={(val) => {
							setSelectedUserId(val);
						}}
						options={[
							{label: "Creator", value: userIds.creator},
							{label: "Agent", value: userIds.agent},
							{label: "Client", value: userIds.client},
						]}
						defaultValue={userIds.creator}
					/>
				</Space>
				<ContractForm
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='SmartDeal'
					method='addTask'
					sendArgs={{
						from: drizzleState.accounts[selectedUserId],
						gasPrice: 200,
						gas: 6721975,
					}}
					labels={["name", "amount"]}
					render={customFormRender("Add task")}
				/>
				<ContractForm
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='SmartDeal'
					method='startDeal'
					sendArgs={{
						from: drizzleState.accounts[selectedUserId],
						gasPrice: 200,
						gas: 6721975,
					}}
					render={customFormRender("Start deal")}
				/>
				<ContractForm
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='SmartDeal'
					method='sendProtectionMoney'
					sendArgs={{
						from: drizzleState.accounts[selectedUserId],
						gasPrice: 200,
						gas: 6721975,
						// TODO: make dynamic
						value: Number(
							drizzle.contracts.SmartDeal.methods.getProtectionValue[
								protectionValueKey
								]?.value
						),
					}}
					render={customFormRender("Send protection money")}
				/>
				<ContractForm
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='SmartDeal'
					method='payForTask'
					sendArgs={{
						from: drizzleState.accounts[selectedUserId],
						gasPrice: 200,
						gas: 6721975,
						// TODO: implement dynamic value obtaining
						value: Number(
							drizzle.contracts.SmartDeal.methods.getCurrentTask[currentTaskKey]
								?.value
						),
					}}
					render={customFormRender("Pay for task")}
				/>

				<ContractForm
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='SmartDeal'
					method='sendTaskToRevision'
					sendArgs={{
						from: drizzleState.accounts[selectedUserId],
						gasPrice: 200,
						gas: 6721975,
					}}
					render={customFormRender("Send task to revision")}
				/>

				<ContractForm
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='SmartDeal'
					method='acceptTask'
					sendArgs={{
						from: drizzleState.accounts[selectedUserId],
						gasPrice: 200,
						gas: 6721975,
					}}
					render={customFormRender("Accept task")}
				/>

				<ContractForm
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='SmartDeal'
					method='declineTask'
					sendArgs={{
						from: drizzleState.accounts[selectedUserId],
						gasPrice: 200,
						gas: 6721975,
					}}
					render={customFormRender("Decline task")}
				/>

				<ContractForm
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='SmartDeal'
					method='cancelDeal'
					sendArgs={{
						from: drizzleState.accounts[selectedUserId],
						gasPrice: 200,
						gas: 6721975,
					}}
					render={customFormRender("Cancel deal")}
				/>

				<ContractForm
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='SmartDeal'
					method='writeReview'
					sendArgs={{
						from: drizzleState.accounts[selectedUserId],
						gasPrice: 200,
						gas: 6721975,
					}}
					render={customFormRender("Write review")}
				/>
			</div>
		</div>
	);
};
