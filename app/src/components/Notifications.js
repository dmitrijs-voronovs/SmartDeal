import { notification } from "antd";
import { useEffect } from "react";

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
			const generateDescription = (info) => {
				switch (info.status) {
					case "pending":
						return "Transaction is pending";
					case "success":
						return `Transaction is successful! Block number: ${info.receipt.blockNumber}, gas used: ${info.receipt.gasUsed}`;
					default:
						return transactionInfo.error?.message;
				}
			};
			notification[
				transactionInfo.status === "pending" ? "info" : transactionInfo.status
			]({
				message: `transaction ${lastTransaction}`,
				description: generateDescription(transactionInfo),
			});
		}
	}, [drizzleState.transactions]);

	return null;
};
