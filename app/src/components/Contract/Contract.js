import React from "react";
import {Info} from "./Info";
import {Tasks} from "./Tasks";
import {Actors} from "./Actors";
import {Actions} from "./Actions";

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
