import Web3 from "web3";

import SmartDeal from "./contracts/SmartDeal.json";

const metamaskProvider = process.env.REACT_APP_WITH_METAMASK
	? window.ethereum
	: null;

const options = {
	web3: {
		block: false,
		customProvider: new Web3(metamaskProvider || "ws://localhost:7545"),
	},
	contracts: [SmartDeal],
	// poll info about accounts every 5 seconds
	polls: {
		accounts: 5000,
	},
	events: {
		// track the following contract events
		SmartDeal: [
			"DealStarted",
			"DealCancelled",
			"TaskAccepted",
			"TaskDeclined",
			"RatingLeft",
		],
	},
};

export default options;
