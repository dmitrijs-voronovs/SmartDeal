import {useEffect, useMemo, useState} from "react";

/**
 * Hook that queries data from contract
 * @param drizzle
 * @param drizzleState
 * @param args contract fields
 * @returns {*}
 */
export const useContractData = ({drizzle, drizzleState, contractName = "SmartDeal"}, ...args) => {
    const [state, setState] = useState(getInitialState(args));

    useEffect(() => {
        const contract = drizzle.contracts[contractName];
        // get and save the key for the variable we are interested in
        // const dataKey = contract.methods["getTasks"].cacheCall();
        setState(() => {
            // argName => cacheIdx
            const entries = args.map(arg => [arg, contract.methods[arg].cacheCall()])
            return Object.fromEntries(entries);
        });
    }, [drizzle]);

    return useMemo(() => getAllState(state, drizzleState, contractName), [state, drizzleState, contractName])
}

const getInitialState = (args) => args.reduce((acc, arg) => {
    acc[arg] = null;
    return acc;
}, {})

const getAllState = (state, drizzleState, contractName) => {
    const contractData = drizzleState.contracts[contractName];
    const resultEntries = Object.entries(state).map(([key, cache]) => [key, contractData[key][cache]?.value])
    return Object.fromEntries(resultEntries);
}
