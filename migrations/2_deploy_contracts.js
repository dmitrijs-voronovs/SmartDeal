const SmartDeal = artifacts.require("SmartDeal");

module.exports = function (deployer, network, accounts) {
	/** Deploys the Smart Deal, where:
	 *  accounts[0] - creator (authorized consultant)
	 *  accounts[1] - agent
	 *  accounts[2] - client
	 *  200 - protection money
	 */
	deployer.deploy(SmartDeal, accounts[1], accounts[2], 30, {
		// overwrite: false,
		from: accounts[0],
		// gas: 3000000,
	});
};
