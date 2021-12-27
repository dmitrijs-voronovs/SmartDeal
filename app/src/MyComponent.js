import { UserOutlined } from "@ant-design/icons";
import { newContextComponents } from "@drizzle/react-components";
import {
	Avatar,
	Button,
	Descriptions,
	Divider,
	Empty,
	Form,
	Input,
	Select,
	Space,
	Steps,
	Typography,
} from "antd";
import React, { useEffect, useState } from "react";

const { AccountData, ContractData, ContractForm } = newContextComponents;
const { Text } = Typography;

export const User = ({ drizzle, drizzleState, idx }) => {
	return (
		<AccountData
			drizzle={drizzle}
			drizzleState={drizzleState}
			accountIndex={idx}
			precision={3}
			render={({ address, balance, units }) => (
				<Space direction='vertical'>
					<Text>{address}</Text>
					<Text>
						{balance} {units}
					</Text>
				</Space>
			)}
		/>
	);
};

const userIds = {
	creator: 0,
	agent: 1,
	client: 2,
};

const customFormRender =
	(text) =>
	({ handleInputChange, handleSubmit, inputTypes, inputs, state }) =>
		(
			<Form
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 14 }}
				onSubmit={handleSubmit}
			>
				{inputs.map(({ name }, i) => (
					<Form.Item
						name={name}
						key={name}
						label={name}
						rules={[{ required: true }]}
					>
						{/* TODO: add special handling for rating (e.g. use <Rate />) */}
						<Input
							name={name}
							value={state[name]}
							onChange={handleInputChange}
							onPressEnter={handleSubmit}
							type={inputTypes[i]}
						/>
					</Form.Item>
				))}
				<Form.Item wrapperCol={{ offset: 6, span: 14 }}>
					<Button type='primary' htmlType='submit' onClick={handleSubmit}>
						{text}
					</Button>
				</Form.Item>
			</Form>
		);

const contractStates = [
	"Init",
	"ProtectionFromClient",
	"ProtectionFromAgent",
	"TaskMoney",
	"TaskInProgress",
	"TaskEvaluation",
	"ProtectionMoneyBack",
	"ReviewsAndRatings",
	"MoneyToAnotherParty",
	"Done",
];

export default ({ drizzle, drizzleState }) => {
	console.log(drizzleState);
	const [currentTaskKey, setCurrentTaskKey] = useState(null);
	const [selectedUserId, setSelectedUserId] = useState(0);

	useEffect(() => {
		const contract = drizzle.contracts.SmartDeal;
		// get and save the key for the variable we are interested in
		// const dataKey = contract.methods["getTasks"].cacheCall();
		const dataKey = contract.methods.taskIdx.cacheCall();
		setCurrentTaskKey(dataKey);
		// console.log({ dataKey });
	}, [drizzle]);

	return (
		<div className='App'>
			<div>
				<h2>Contract information</h2>
				<Descriptions column={1}>
					<Descriptions.Item label='Balance'>
						<ContractData
							drizzle={drizzle}
							drizzleState={drizzleState}
							contract='SmartDeal'
							method='getBalance'
							render={(arg) => `${arg} Wei`}
						/>
					</Descriptions.Item>
					<Descriptions.Item label='State'>
						<ContractData
							drizzle={drizzle}
							drizzleState={drizzleState}
							contract='SmartDeal'
							method='state'
							render={(arg) => contractStates[arg]}
						/>
					</Descriptions.Item>
					<Descriptions.Item label='Combined task value'>
						<ContractData
							drizzle={drizzle}
							drizzleState={drizzleState}
							contract='SmartDeal'
							method='contractValue'
							render={(arg) => arg}
						/>
					</Descriptions.Item>
					<Descriptions.Item label='Protection percent'>
						<ContractData
							drizzle={drizzle}
							drizzleState={drizzleState}
							contract='SmartDeal'
							method='protectionPercent'
							render={(arg) => `${arg}%`}
						/>
					</Descriptions.Item>
				</Descriptions>
			</div>
			<div>
				<h2>Actors</h2>
				<Divider orientation='left'>Authorized consultant</Divider>
				<Space align='center'>
					<Avatar
						style={{ backgroundColor: "#87d068" }}
						icon={<UserOutlined />}
					/>
					<User
						idx={userIds.creator}
						drizzle={drizzle}
						drizzleState={drizzleState}
					/>
				</Space>
				<Divider orientation='left'>Agent</Divider>
				<Space align='center'>
					<Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
						A
					</Avatar>
					<User
						idx={userIds.agent}
						drizzle={drizzle}
						drizzleState={drizzleState}
					/>
				</Space>
				<Divider orientation='left'>Client</Divider>
				<Space align='center'>
					<Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
						C
					</Avatar>
					<User
						idx={userIds.client}
						drizzle={drizzle}
						drizzleState={drizzleState}
					/>
				</Space>
			</div>
			<div>
				<h2>Tasks</h2>
				<ContractData
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='SmartDeal'
					method='getTasks'
					render={(items) => {
						if (!items.length) return <Empty description='no tasks' />;

						const current =
							(drizzle.contracts.SmartDeal.methods.taskIdx[currentTaskKey]
								?.value || 0) - 1;
						// const current = -1;
						const getTitle = (itemIdx, selectedIdx) => {
							switch (true) {
								case itemIdx < selectedIdx:
									return "Finished";
								// TODO: add handling for different states
								case itemIdx == selectedIdx:
									return "In Progress";
								default:
									return "Waiting";
							}
						};

						return (
							<Steps direction='vertical' size='small' current={current}>
								{items.map(({ title, amount }, i) => (
									<Steps.Step
										key={title}
										title={getTitle(i, current)}
										subtitle='Me'
										description={`${title} - ${amount}`}
									/>
								))}
							</Steps>
						);
					}}
				/>
			</div>
			<div>
				<h2>Actions</h2>
				<Space>
					<p>Select a user</p>
					<Select
						onChange={(val) => {
							setSelectedUserId(val);
						}}
						defaultValue='a1'
						options={[
							{ label: "Creator", value: userIds.creator },
							{ label: "Agent", value: userIds.agent },
							{ label: "Client", value: userIds.client },
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
