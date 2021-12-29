import {Descriptions} from "antd";
import React from "react";
import {newContextComponents} from "@drizzle/react-components";
import {getContractState} from "../../utils/ContractStates";

const { ContractData } = newContextComponents;

export function Info(props) {
    return <div>
        <h2>Contract information</h2>
        <Descriptions column={1}>
            <Descriptions.Item label="Balance">
                <ContractData
                    drizzle={props.drizzle}
                    drizzleState={props.drizzleState}
                    contract="SmartDeal"
                    method="getBalance"
                    render={(arg) => `${arg} Wei`}
                />
            </Descriptions.Item>
            <Descriptions.Item label="State">
                <ContractData
                    drizzle={props.drizzle}
                    drizzleState={props.drizzleState}
                    contract="SmartDeal"
                    method="state"
                    render={(stateIdx) => getContractState(stateIdx)}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Combined task value">
                <ContractData
                    drizzle={props.drizzle}
                    drizzleState={props.drizzleState}
                    contract="SmartDeal"
                    method="contractValue"
                    render={(arg) => `${arg} Wei`}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Protection percent">
                <ContractData
                    drizzle={props.drizzle}
                    drizzleState={props.drizzleState}
                    contract="SmartDeal"
                    method="protectionPercent"
                    render={(arg) => `${arg}%`}
                />
            </Descriptions.Item><Descriptions.Item label="Protection value">
                <ContractData
                    drizzle={props.drizzle}
                    drizzleState={props.drizzleState}
                    contract="SmartDeal"
                    method="getProtectionValue"
                    render={(arg) => `${arg} Wei`}
                />
            </Descriptions.Item>
        </Descriptions>
    </div>;
}