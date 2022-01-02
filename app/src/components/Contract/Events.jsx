import React, {useEffect, useState} from "react";
import {Card, List} from "antd";
import {getEventNotification} from "../Notifications";

export function Events({ drizzle, drizzleState }) {
	const [events, setEvents] = useState([]);
	useEffect(() => {
		const web3 = drizzle.web3;
		const contract = drizzle.contracts.SmartDeal;
		const c = new web3.eth.Contract(contract.abi, contract.address);
		c.getPastEvents("allEvents", {fromBlock: "earliest"}).then((e) => {
			setEvents(e);
			console.log(e);
		});
	}, [drizzleState.contracts.SmartDeal.events]);

	// useEffect(() => {
	//
	// }, )

	return (
		<div style={{ background: "white", padding: "1rem", marginTop: "1rem" }}>
			<h2>Events</h2>
			<List
				grid={{
					gutter: 16,
					xs: 1,
					column: 2,
				}}
				dataSource={events}
				renderItem={item => (
					<List.Item>
						<Card title={item.event} style={{ wordBreak:  "break-all" }}>{getEventNotification(item).description}</Card>
					</List.Item>
				)} />
		</div>
	);
}
