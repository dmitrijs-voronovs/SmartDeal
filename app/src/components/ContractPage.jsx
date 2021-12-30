import { Contract } from "./Contract/Contract";
import { Notifications } from "./Notifications";
import React from "react";

export function ContractPage(props) {
	return (
		<>
			<Contract drizzle={props.drizzle} drizzleState={props.drizzleState} />
			<Notifications
				drizzle={props.drizzle}
				drizzleState={props.drizzleState}
			/>
		</>
	);
}
