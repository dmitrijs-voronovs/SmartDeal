import React, {useEffect, useState} from "react";
import {Empty, Steps} from "antd";
import {newContextComponents} from "@drizzle/react-components";
const { ContractData } = newContextComponents;

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

export function Tasks(props) {

    // TODO: inside contract make default idx -1;
    const [taskIdKey, setTaskIdKey] = useState(null);

    useEffect(() => {
        console.log("______________NEW__________");
        const contract = props.drizzle.contracts.SmartDeal;
        // get and save the key for the variable we are interested in
        // const dataKey = contract.methods["getTasks"].cacheCall();
        const taskIdKey = contract.methods.taskIdx.cacheCall();
        setTaskIdKey(taskIdKey);
        // setCurrentTaskKey(contract.methods.getCurrentTask.cacheCall());
        // setProtectionValueKey(contract.methods.getProtectionValue.cacheCall());
    }, [props.drizzle]);


    console.log(
        "_____protectionVal",
        taskIdKey,
        props.drizzle.contracts.SmartDeal,
        props.drizzle.contracts.SmartDeal.taskIdx,
        props.drizzle.contracts.SmartDeal.taskIdx?.[taskIdKey],
        props.drizzle.contracts.SmartDeal.taskIdx?.[taskIdKey]?.value
        // drizzle.contracts.SmartDeal.taskIdx[taskIdKey]?.value,
    );


    return <div>
        <h2>Tasks</h2>
        <ContractData
            drizzle={props.drizzle}
            drizzleState={props.drizzleState}
            contract="SmartDeal"
            method="getTasks"
            render={(items) => {
                if (!items.length) return <Empty description='no tasks'/>;

                const current =
                    (props.drizzle.contracts.SmartDeal.methods.taskIdx[taskIdKey]?.value ||
                        0) - 1;

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