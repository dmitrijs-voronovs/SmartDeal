import React, { useEffect } from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
	console.log(drizzleState);

	useEffect(() => {
		const contract = drizzle.contracts.SmartDeal;

		// get and save the key for the variable we are interested in
		// const dataKey = contract.methods["getTasks"].cacheCall();
		// console.log({ dataKey });
	}, []);
	// destructure drizzle and drizzleState from props
	return (
		<div className='App'>
			<div>
				<img src={logo} alt='drizzle-logo' />
				<h1>Drizzle Examples</h1>
				<p>
					Examples of how to get started with Drizzle in various situations.
				</p>
			</div>
			<div className='section'>
				<h2>Active Account</h2>
				<AccountData
					drizzle={drizzle}
					drizzleState={drizzleState}
					accountIndex={0}
					units='ether'
					precision={3}
				/>
				<AccountData
					drizzle={drizzle}
					drizzleState={drizzleState}
					accountIndex={1}
					units='ether'
					precision={3}
				/>
			</div>
			<ContractData
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='getBalance'
			/>
			<br />
			Tasks:
			<ContractData
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='getTasks'
			/>
			<br />
			TaskIdx:
			<ContractData
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='taskIdx'
			/>
			<br />
			<ContractData
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='agent'
			/>
			<br />
			<ContractData
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='client'
			/>
			<br />
			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='SmartDeal'
				method='addTask'
				sendArgs={{
					from: drizzleState.accounts[0],
					gasPrice: 200,
					gas: 6721975,
				}}
				labels={["name", "amount"]}
				render={(...args) => {
					console.log(args);
					return null;
				}}
			/>
			{/* <div className='section'>
				<h2>SimpleStorage</h2>
				<p>
					This shows a simple ContractData component with no arguments, along
					with a form to set its value.
				</p>
				<p>
					<strong>Stored Value: </strong>
					<ContractData
						drizzle={drizzle}
						drizzleState={drizzleState}
						contract='SimpleStorage'
						method='storedData'
					/>
				</p>
				<ContractForm drizzle={drizzle} contract='SimpleStorage' method='set' />
			</div>

			<div className='section'>
				<h2>TutorialToken</h2>
				<p>
					Here we have a form with custom, friendly labels. Also note the token
					symbol will not display a loading indicator. We've suppressed it with
					the <code>hideIndicator</code> prop because we know this variable is
					constant.
				</p>
				<p>
					<strong>Total Supply: </strong>
					<ContractData
						drizzle={drizzle}
						drizzleState={drizzleState}
						contract='TutorialToken'
						method='totalSupply'
						methodArgs={[{ from: drizzleState.accounts[0] }]}
					/>{" "}
					<ContractData
						drizzle={drizzle}
						drizzleState={drizzleState}
						contract='TutorialToken'
						method='symbol'
						hideIndicator
					/>
				</p>
				<p>
					<strong>My Balance: </strong>
					<ContractData
						drizzle={drizzle}
						drizzleState={drizzleState}
						contract='TutorialToken'
						method='balanceOf'
						methodArgs={[drizzleState.accounts[0]]}
					/>
				</p>
				<h3>Send Tokens</h3>
				<ContractForm
					drizzle={drizzle}
					contract='TutorialToken'
					method='transfer'
					labels={["To Address", "Amount to Send"]}
				/>
			</div>

			<div className='section'>
				<h2>ComplexStorage</h2>
				<p>
					Finally this contract shows data types with additional considerations.
					Note in the code the strings below are converted from bytes to UTF-8
					strings and the device data struct is iterated as a list.
				</p>
				<p>
					<strong>String 1: </strong>
					<ContractData
						drizzle={drizzle}
						drizzleState={drizzleState}
						contract='ComplexStorage'
						method='string1'
						toUtf8
					/>
				</p>
				<p>
					<strong>String 2: </strong>
					<ContractData
						drizzle={drizzle}
						drizzleState={drizzleState}
						contract='ComplexStorage'
						method='string2'
						toUtf8
					/>
				</p>
				<strong>Single Device Data: </strong>
				<ContractData
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='ComplexStorage'
					method='singleDD'
				/>
			</div> */}
		</div>
	);
};
