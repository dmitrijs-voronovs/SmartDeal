import React, {useEffect, useState} from "react";
import {Empty, Steps} from "antd";
import {newContextComponents} from "@drizzle/react-components";
import {useContractData} from "./GetTitle";

const {ContractData} = newContextComponents;

const getTitle = (itemIdx, selectedIdx) => {
    switch (true) {
        case itemIdx < selectedIdx:
            return "Finished";
        // TODO: add handling for different states
        case itemIdx === selectedIdx:
            return "In Progress";
        default:
            return "Waiting";
    }
};

export function Tasks({drizzle, drizzleState}) {

    // TODO: inside contract make default idx -1;
    const [taskIdKey, setTaskIdKey] = useState(null);

    useEffect(() => {
        const contract = drizzle.contracts.SmartDeal;
        // get and save the key for the variable we are interested in
        // const dataKey = contract.methods["getTasks"].cacheCall();
        setTaskIdKey(contract.methods.taskIdx.cacheCall());
    }, [drizzle]);

    const contractData = drizzleState.contracts.SmartDeal;

    const {taskIdx} = useContractData({drizzle, drizzleState}, 'taskIdx')
    console.log({taskIdx})

    return <div>
        <h2>Tasks</h2>
        <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SmartDeal"
            method="getTasks"
            render={(items) => {
                if (!items.length) return <Empty description='no tasks'/>;

                const current =
                    (contractData.taskIdx[taskIdKey]?.value ||
                        0);

                return (
                    <Steps direction='vertical' size='small' current={current}>
                        {items.map(({title, amount}, i) => (
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
    </div>;
}