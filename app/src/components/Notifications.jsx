import { notification } from "antd";
import { useEffect } from "react";

const generateDescription = (info) => {
	switch (info.status) {
		case "pending":
			return "Transaction is pending";
		case "success":
			return `Transaction is successful! Block number: ${info.receipt.blockNumber}, gas used: ${info.receipt.gasUsed}`;
		default:
			return info.error?.message;
	}
};

function getEventDescription({ returnValues }) {
	if (!Object.keys(returnValues).length) {
		return "No parameters";
	}

	const eventParams = Object.entries(returnValues).filter(([key]) => isNaN(Number(key)));
	return eventParams.map((param) => param.join(": ")).join(", ");
}

export function getEventNotification(event) {
	const message = `Event: ${event.event}`;
	const description = getEventDescription(event)
	return {
		message,
		description
	}
}

export const Notifications = ({ drizzle, drizzleState }) => {
	useEffect(() => {
		const lastTransaction = drizzleState.transactionStack
			.reverse()
			.find((hash) => hash in drizzleState.transactions);
		if (lastTransaction) {
			const transactionInfo = drizzleState.transactions[lastTransaction];
			console.log({
				drizzleState,
				lastTransaction,
				transactionInfo,
				revTr: drizzleState.transactionStack.reverse(),
			});

			// notification about transaction
			notification[
				transactionInfo.status === "pending" ? "info" : transactionInfo.status
			]({
				message: `transaction ${lastTransaction}`,
				description: generateDescription(transactionInfo),
			});

			// event notification
			const eventNotifications = Object.values(transactionInfo?.receipt?.events || {}).map(event => getEventNotification(event));
			eventNotifications.map(event =>notification.info(event));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [drizzleState.transactions]);

	useEffect(() => {
		const contract = drizzle.contracts.SmartDeal;
		const events = contract.events.allEvents();
		console.log(events);
	}, [drizzleState.contracts.SmartDeal.events])

	return null;
};
