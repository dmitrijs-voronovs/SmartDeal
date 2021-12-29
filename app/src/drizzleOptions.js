import Web3 from "web3";

import SmartDeal from "./contracts/SmartDeal.json";

const options = {
	web3: {
		block: false,
		customProvider: new Web3("ws://localhost:7545"),
	},
	contracts: [SmartDeal],
	// events: {
	// 	SimpleStorage: ["StorageSet"],
	// },
};

export default options;
