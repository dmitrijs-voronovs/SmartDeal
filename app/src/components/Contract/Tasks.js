import React from "react";
import {Empty, Steps} from "antd";
import {newContextComponents} from "@drizzle/react-components";
import {useContractData} from "./GetTitle";
import {contractStateEnum, contractStates, getContractState} from "../../utils/ContractStates";

const {ContractData} = newContextComponents;
const validTaskStates = [contractStateEnum.TaskEvaluation, contractStateEnum.TaskInProgress];

const getTitle = (itemIdx, selectedIdx, state) => {
    switch (true) {
        case itemIdx < selectedIdx:
            return "Finished";
        // TODO: add handling for different states
        case itemIdx === selectedIdx:
            if (getContractState(state) === contractStateEnum.TaskEvaluation) return "Evaluating";
            if (getContractState(state) === contractStateEnum.TaskInProgress) return "In Progress";
        default:
            return "To do";
    }
};

export function Tasks({drizzle, drizzleState}) {
    const {taskIdx, state } = useContractData({drizzle, drizzleState}, 'taskIdx', "state")
    console.log({taskIdx, state})

    return <div>
        <h2>Tasks</h2>
        <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SmartDeal"
            method="getTasks"
            render={(items) => {
                if (!items.length) return <Empty description='no tasks'/>;

                const hasStartedImplementingTasks = validTaskStates.includes(getContractState(state))
                const current = hasStartedImplementingTasks ? Number(taskIdx) : -1;

                return (
                    <Steps direction='vertical' size='small' current={current}>
                        {items.map(({title, amount}, i) => {
                            return (
                                <Steps.Step
                                    key={title}
                                    title={getTitle(i, current, state)}
                                    subtitle='Me'
                                    description={`${title} - ${amount} Wei`}
                                />
                            );
                        })}
                    </Steps>
                );
            }}
        />
    </div>;
}