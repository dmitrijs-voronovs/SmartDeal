import { Card, Descriptions } from "antd";
import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import { getContractState } from "../../utils/ContractStates";
import {getEthValue} from "../../utils/getEthValue";

const { ContractData } = newContextComponents;

export function Info({ drizzle, drizzleState }) {
	return (
		<div>
			{/* <h2>Contract information</h2> */}
			<Card title='Contract Information'>
				<Descriptions column={1}>
					<Descriptions.Item label='Balance'>
						<ContractData
							drizzle={drizzle}
							drizzleState={drizzleState}
							contract='SmartDeal'
							method='getBalance'
							render={(arg) => getEthValue(drizzle, arg)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label='State'>
						<ContractData
							drizzle={drizzle}
							drizzleState={drizzleState}
							contract='SmartDeal'
							method='state'
							render={(stateIdx) => getContractState(stateIdx)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label='Combined task value'>
						<ContractData
							drizzle={drizzle}
							drizzleState={drizzleState}
							contract='SmartDeal'
							method='contractValue'
							render={(arg) => getEthValue(drizzle, arg)}
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
					<Descriptions.Item label='Protection value'>
						<ContractData
							drizzle={drizzle}
							drizzleState={drizzleState}
							contract='SmartDeal'
							method='getProtectionValue'
							render={(arg) => getEthValue(drizzle, arg)}
						/>
					</Descriptions.Item>
				</Descriptions>
			</Card>
		</div>
	);
}
