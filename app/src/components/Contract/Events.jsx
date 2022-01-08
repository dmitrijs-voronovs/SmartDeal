import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import { getEventNotification } from "../Notifications";

export function Events({ drizzle, drizzleState }) {
	const [events, setEvents] = useState([]);
	useEffect(() => {
		const contract = drizzle.contracts.SmartDeal;
		const web3Contract = new drizzle.web3.eth.Contract(
			contract.abi,
			contract.address
		);
		web3Contract
			.getPastEvents("allEvents", { fromBlock: "earliest" })
			.then(setEvents);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [drizzleState.contracts.SmartDeal.events]);

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
				renderItem={(item) => (
					<List.Item>
						<Card title={item.event} style={{ wordBreak: "break-word" }}>
							{getEventNotification(item).description}
						</Card>
					</List.Item>
				)}
			/>
		</div>
	);
}
