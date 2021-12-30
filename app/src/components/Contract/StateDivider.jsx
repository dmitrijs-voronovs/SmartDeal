import {getContractState} from "../../utils/ContractStates";
import {Divider} from "antd";
import React from "react";

export function StateDivider({stateNames, currentStateIdx}) {
    const isCurrentState = stateNames.includes(getContractState(currentStateIdx));
    console.log(isCurrentState, {
        stateNames,
        currentStateIdx,
        state: getContractState(currentStateIdx),
    });
    return (
        <Divider orientation='left' style={isCurrentState ? {color: "blue"} : {}}>
            {stateNames.join(", ")}
        </Divider>
    );
}