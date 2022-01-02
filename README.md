## Multi-step payment tracking dapp &quot;Smart deal&quot;

### Problem

Multi-step business deals, agile projects, complex agreements have a common issue of payment tracking and fulfillment. Usually a 3rd party has to be involved to control if deliverables are completed and an agreed sum of money for each stage is paid in time.

### Solution

&quot;Smart deal&quot; is a convenient and reliable decentralized system that helps to define monetary agreement between a client and an agent. Moreover, It helps to prevent deals with unqualified agents by storing history of completed deals, reviews and ratings.

&quot;Smart deal&quot; solution includes a convenient web-based portal with authorized consultants that help to create an agreement and resolve all the issues.

As a starting point, a client comes up with specific requirements for a task and picks an agent by looking at the rating and reviews. Then the client and the agent get connected via a web-based platform to discuss the requirements and every task of the deal. Each task section contains a task name and a short description. The agent has to acknowledge himself with the deal and evaluate every task. By the end of the negotiation process the contract gets submitted to the system where authorized consultants register it in a blockchain.

Once the contract gets registered:

1. Both parties transfer the agreed percentage of the original estimated money to the contract address for protection purposes (read below).
2. Deal changes its status to active
3. First task gets opened
4. Client&#39;s money for the first task get reserved by transferring it to contract&#39;s address
5. Agent works on the pending task.

When the task is done:

1. Agent marks the task as &quot;ready for review&quot; in the system and sends evidence to the client for the verification
2. If the client is happy with the results, he/she accepts the task in the system. Next task gets opened.
   Otherwise the task gets rejected and returned back to the agent with additional comments (which are sent within a portal).
3. Cycle repeats with the new task.

At the end of the deal, when the last task is completed, a deal comes to its logical end. The client leaves a rating and a review about the agent&#39;s work. Protection money gets transferred back from the contract&#39;s address to contract parties.

As a result, both parties complete the agreement with no extra cost and worries for the project and transaction management. Moreover, there is a special protection mechanism that ensures that one party gets compensated in case of another one dropping the contract. Compensation is calculated based on the percentage of the contract&#39;s original estimated value and is obtained during the contract creation.

### Blockchain details

#### Public blockchain

&quot;Smart deal&quot; is deployed on a public blockchain. Public blockchain is the most transparent type of blockchain where anyone is free to join and participate in the core activities! It also encourages new users to join the network. It is a win-win solution for both parties - agents are motivated to keep their work on a decent level to get positive reviews and ratings, which get stored forever inside a blockchain, while clients can browse through agents and their never-changing history of all the deals and pick the most suitable one for their particular tasks.

#### Storing the data

Blockchain is not meant to store huge documents, images or texts as it is costly and time-consuming, therefore there are two ways to overcome that limitation:

1. Use ready blockchain solutions for storing data in a decentralized way via dedicated protocol.
2. Store only necessary information in a blockchain, while providing detailed info in a web-based portal.

As connecting a prototype under development to a real working blockchain solution by a 3rd party is beyond the requirements of the course, a second approach was picked.

In the scope of &quot;Smart deal&quot;, a web-based portal should provide a way for a customer to communicate with an agent. Portal will handle the following actions:

- Sending a deal
- Negotiating about the prices
- Sending revision notes

The following transactions will be recorded in a blockchain:

- Deal registration (initiator: authorized consultant)
- Sending protection money to contract&#39;s address (initiator: agent, customer)
- Sending money for a task (initiator: customer)
- Task sending for revision (initiator: agent)
- Task completion / rejection (initiator: customer)
- Deal&#39;s cancellation (initiator: agent, customer)
- Deal&#39;s completion (initiator: customer)

###

### Use case diagram

![](RackMultipart20220102-4-1wmj4tm_html_a40456edd98694b4.png)

###

### Smart contract state diagram

![](RackMultipart20220102-4-1wmj4tm_html_e31fe3a22a868211.png)

### Detailed class diagram - fields, events, modifiers, functions

![](RackMultipart20220102-4-1wmj4tm_html_154e8ff6130c4e3d.png)

### Deployed contract in Remix

![](RackMultipart20220102-4-1wmj4tm_html_a326fc434470f1ea.png) ![](RackMultipart20220102-4-1wmj4tm_html_177a0eeb382fcd34.png) ![](RackMultipart20220102-4-1wmj4tm_html_177a0eeb382fcd34.png)

### Tests

Using the [official truffle guide](https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript.html#using-asyncawait) for testing I wrote several unit tests for the contract.

Tests were created to represent how the contract can be tested. Tests do not cover all scenarios, just the main one with successful deal completion.

Tests can be run via **truffe test** command

Note: in production unit tests should test each function separately. Once every function is covered, the entire contract can be tested in the whole.

![](RackMultipart20220102-4-1wmj4tm_html_dd9942255f8e168b.png)

### Future improvements

There following enhancements can be done to &quot;Smart deal&quot; to make it more advanced tool for managing payments:

1. Introduce a time limit for task completion. If a task is not completed by the end of the agreed time period - deal gets cancelled and both money for the task and protection money of parties go to the client.
2. Add requirements for customer&#39;s balance before creating a smart deal, for example, a deal can not be started if a customer does not have the amount equivalent to protection money + money for the first task.
3. Introduce tips for greatly implemented tasks / a deal.
4. Introduce change management to &quot;Smart deal&quot;. Originally it was intended to create a separate &quot;Smart deal&quot; that helps solving changes to the project. Maybe in some cases it is more convenient to change deal parameters (shift deadlines, add / remove / adjust tasks) to fit requirements and keep everything in one place, rather than having several deals.
