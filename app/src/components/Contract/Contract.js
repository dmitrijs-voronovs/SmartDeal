import {newContextComponents} from "@drizzle/react-components";
import {Select, Space,} from "antd";
import React, {useState} from "react";
import {Info} from "./Info";
import {customFormRender} from "../../utils/CustomFormRender";
import {Tasks} from "./Tasks";
import {Actors} from "./Actors";
import {useContractData} from "./GetTitle";

const {ContractForm} = newContextComponents;

export const userIds = {
    creator: 0, agent: 1, client: 2,
};

function Actions({drizzle, drizzleState}) {
    const [selectedUserId, setSelectedUserId] = useState(0);

    const {getProtectionValue: protectionValue, getCurrentTask: currentTask} = useContractData({
        drizzle, drizzleState
    }, "getProtectionValue", "getCurrentTask")
    const accounts = drizzleState.accounts;

    return <div>
        <h2>Actions</h2>
        <Space>
            <p>Select a user</p>
            <Select
                onChange={(val) => {
                    setSelectedUserId(val);
                }}
                options={[{label: "Creator", value: userIds.creator}, {
                    label: "Agent", value: userIds.agent
                }, {label: "Client", value: userIds.client},]}
                defaultValue={userIds.creator}
            />
        </Space>
        <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SmartDeal"
            method="addTask"
            sendArgs={{
                from: accounts[selectedUserId], gasPrice: 200, gas: 6721975,
            }}
            labels={["name", "amount"]}
            render={customFormRender("Add task")}
        />
        <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SmartDeal"
            method="startDeal"
            sendArgs={{
                from: accounts[selectedUserId], gasPrice: 200, gas: 6721975,
            }}
            render={customFormRender("Start deal")}
        />
        <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SmartDeal"
            method="sendProtectionMoney"
            sendArgs={{
                from: accounts[selectedUserId], gasPrice: 200, gas: 6721975, value: Number(protectionValue),
            }}
            render={customFormRender("Send protection money")}
        />
        <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SmartDeal"
            method="payForTask"
            sendArgs={{
                from: accounts[selectedUserId], gasPrice: 200, gas: 6721975, value: Number(currentTask?.amount),
            }}
            render={customFormRender("Pay for task")}
        />

        <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SmartDeal"
            method="sendTaskToRevision"
            sendArgs={{
                from: accounts[selectedUserId], gasPrice: 200, gas: 6721975,
            }}
            render={customFormRender("Send task to revision")}
        />

        <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SmartDeal"
            method="acceptTask"
            sendArgs={{
                from: accounts[selectedUserId], gasPrice: 200, gas: 6721975,
            }}
            render={customFormRender("Accept task")}
        />

        <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SmartDeal"
            method="declineTask"
            sendArgs={{
                from: accounts[selectedUserId], gasPrice: 200, gas: 6721975,
            }}
            render={customFormRender("Decline task")}
        />

        <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SmartDeal"
            method="cancelDeal"
            sendArgs={{
                from: accounts[selectedUserId], gasPrice: 200, gas: 6721975,
            }}
            render={customFormRender("Cancel deal")}
        />

        <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SmartDeal"
            method="writeReview"
            sendArgs={{
                from: accounts[selectedUserId], gasPrice: 200, gas: 6721975,
            }}
            render={customFormRender("Write review")}
        />
    </div>;
}

// TODO: implement events for every state transition ??? or check how to track state change
export const Contract = ({drizzle, drizzleState}) => {
    return (
        <div className='App'>
            <Info drizzle={drizzle} drizzleState={drizzleState}/>
            <Actors drizzle={drizzle} drizzleState={drizzleState}/>
            <Tasks drizzle={drizzle} drizzleState={drizzleState}/>
            <Actions drizzle={drizzle} drizzleState={drizzleState}/>
        </div>
    );
};
