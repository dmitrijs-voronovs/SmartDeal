const SmartDeal = artifacts.require("SmartDeal");
const { toWei, fromWei } = web3.utils;

const toNumber = (val) => Number(fromWei(val));
const getBalance = async (acc) => toNumber(await web3.eth.getBalance(acc));

contract("SmartDeal", (accounts) => {
	const agent = accounts[1];
	const client = accounts[2];
	const creator = accounts[0];
	const createContract = async (protectionPercent = 30) =>
		SmartDeal.new(agent, client, protectionPercent, { from: creator });

	it("should initialize with empty task array", async () => {
		const deal = await createContract();
		const tasks = await deal.getTasks({ from: agent });
		expect(tasks).to.deep.equal([]);
	});

	it("should only allow creator to add tasks", async () => {
		const deal = await createContract();
		try {
			await deal.addTask("First task", 1, { from: agent });
		} catch (e) {
			expect(e.reason).to.contain("Only creator can call this function");
		}

		try {
			await deal.addTask("First task", 1, { from: client });
		} catch (e) {
			expect(e.reason).to.contain("Only creator can call this function");
		}

		const res = await deal.addTask("First task", 1, { from: creator });
		expect(res).to.have.property("tx");
	});

	// In production such big unit tests should be split into multiple.
	// For testing smaller chunks children test contracts with predefined state can be created.
	it("should successfully create a deal, complete all tasks and finish it", async () => {
		const precision = 0.001;

		// starting deal
		const deal = await createContract(50);
		const taskValue = toWei("1");
		await deal.addTask("First task", taskValue, { from: creator });
		await deal.startDeal({ from: creator });

		// sending protection value + checking account balances
		const clientInitialBalance = await getBalance(client);
		const protectionAmount = await deal.getProtectionValue();
		await deal.sendProtectionMoney({ from: client, value: protectionAmount });
		const clientBalanceAfterProtectionMoney = await getBalance(client);
		expect(clientInitialBalance - toNumber(protectionAmount)).to.be.closeTo(
			clientBalanceAfterProtectionMoney,
			precision
		);
		await deal.sendProtectionMoney({ from: agent, value: protectionAmount });
		let state = Number(await deal.state());
		expect(state).to.equal(3);

		// completing single task
		await deal.payForTask({ from: client, value: taskValue });
		let clientBalanceAfterPaidForTask = await getBalance(client);
		expect(
			clientBalanceAfterProtectionMoney - toNumber(taskValue)
		).to.be.closeTo(clientBalanceAfterPaidForTask, precision);
		await deal.sendTaskToRevision({ from: agent });
		const agentBalance = await getBalance(agent);
		await deal.acceptTask({ from: client });

		// check final balances
		const agentFinalBalance = await getBalance(agent);
		expect(
			agentBalance + toNumber(taskValue) + toNumber(protectionAmount)
		).to.be.closeTo(agentFinalBalance, precision);
		const clientFinalBalance = await getBalance(client);
		expect(
			clientBalanceAfterPaidForTask + toNumber(protectionAmount)
		).to.be.closeTo(clientFinalBalance, precision);

		// writing review
		const result = await deal.writeReview(5, "Good job!", { from: client });
		expect(result).to.have.property("tx");
	});
});
