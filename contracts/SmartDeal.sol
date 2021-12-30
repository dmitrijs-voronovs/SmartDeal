// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SmartDeal {
    struct Task {
        string title;
        uint amount;
    }
    enum State { Init, ProtectionFromClient, ProtectionFromAgent, PayForTask, TaskInProgress, TaskEvaluation, ProtectionMoneyBack, ReviewsAndRatings, MoneyToAnotherParty, Done }

    State public state = State.Init;
    Task[] public tasks;
    // TODO: maybe int?
    uint public taskIdx = 0;
    // value for all the tasks
    uint public contractValue;
    // Can be private, but exposed for sake of displaying in UI
    address public creator;
    address payable public agent;
    address payable public client;
    uint public protectionPercent;


    constructor(address _agent, address _client, uint _protectionPercent) {
        require(_protectionPercent > 0 && _protectionPercent < 100, "Protection percent should be in range 1%..99% of the entire contract's value");
        creator = msg.sender;
        agent = payable(_agent);
        client = payable(_client);
        // TODO: fix percent
        protectionPercent = _protectionPercent;
    }

    modifier atState(State _state) {
        require(state == _state, "Function can not be called at current state");
        _;
    }

    modifier onlyAgent {
        require(
            msg.sender == agent,
            "Only agent can call this function"
        );
        _;
    }

    modifier onlyClient {
        require(
            msg.sender == client,
            "Only client can call this function"
        );
        _;
    }

    modifier onlyParties {
        require(
            msg.sender == client || msg.sender == agent,
            "Only parties of the deal can call this function"
        );
        _;
    }

    modifier onlyCreator {
        require(
            msg.sender == creator,
            "Only creator can call this function"
        );
        _;
    }

// ---------

    function getProtectionValue() public view returns (uint money) {
        return contractValue * protectionPercent / 100;
    }

    function getCurrentTask() public view returns (Task memory task) {
        return tasks[taskIdx];
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getTasks() external view returns (Task[] memory allTasks) {
        return tasks;
    }

// ---------

    function addTask(string memory title, uint amount) public atState(State.Init) onlyCreator {
        tasks.push(Task(title, amount));
        contractValue += amount;
    }

    function startDeal() public atState(State.Init) onlyCreator {
        require(tasks.length != 0, "Deal should containt at least one task");
        state = State.ProtectionFromClient;
    }

    // both agent and client
    function sendProtectionMoney() public payable onlyParties {
        require(
            state == State.ProtectionFromClient
            || state == State.ProtectionFromAgent,
            "Function can not be called at current state"
        );
        require(msg.value == getProtectionValue(), "Incorrect protection money amount");

        if (state == State.ProtectionFromClient) {
            require(msg.sender == client, "Client should send protection money");
            state = State.ProtectionFromAgent;
        } else {
            require(msg.sender == agent, "Agent should send protection money");
            state = State.PayForTask;
        }
    }

    function payForTask() public payable atState(State.PayForTask) onlyClient {
        require(msg.value == getCurrentTask().amount, "Incorrect amount");
        state = State.TaskInProgress;
    }

    function sendTaskToRevision() public atState(State.TaskInProgress) onlyAgent {
        state = State.TaskEvaluation;
    }

     // payable directly or its internal functions?
    function cancelDeal() public atState(State.TaskInProgress) onlyParties {
        // TODO: remove state?? it is not needed here?
        state = State.MoneyToAnotherParty;

        // if client cancels - agent receives money. And vice versa.
        address payable compensationReceiver = msg.sender == client ? agent : client;

        // pay money back to the client for current task
        (bool successMoneyForTaskReturn,) = client.call{value: getCurrentTask().amount}("");
        require(successMoneyForTaskReturn, "Failed to send money");

        // and pay compensation
        (bool successCompensation,) = compensationReceiver.call{value: getBalance()}("");
        require(successCompensation, "Failed to send money");

        state = State.ReviewsAndRatings;
    }

    event AcceptedTask(string title);

    function acceptTask() public atState(State.TaskEvaluation) onlyClient {
        (bool success,) = agent.call{value: getCurrentTask().amount}("");
        require(success, "Failed to send money");

        emit AcceptedTask(getCurrentTask().title);

        taskIdx += 1;
        if (taskIdx == tasks.length) {
            state = State.ProtectionMoneyBack;
            returnProtectionMoney();
        } else {
            state = State.PayForTask;
        }
    }

    event DeclinedTask(string title, string revisionMessage);

    function declineTask(string memory revisionMessage) public atState(State.TaskEvaluation) onlyClient {
        emit DeclinedTask(getCurrentTask().title, revisionMessage);

        state = State.TaskInProgress;
    }

    // Potentially state can be skipped and everything could be done under TaskEvaluation
    // but that would not be semantically correct;
    function returnProtectionMoney() internal atState(State.ProtectionMoneyBack) onlyParties {
        (bool successReturnToAgent,) = agent.call{value: getProtectionValue()}("");
        require(successReturnToAgent, "Failed to send money");

        (bool successReturnToClient,) = client.call{value: getProtectionValue()}("");
        require(successReturnToClient, "Failed to send money");
        state = State.ReviewsAndRatings;
    }

    event LeftRating(uint rating, string review);

    function writeReview(uint rating, string memory review) public atState(State.ReviewsAndRatings) onlyClient {
        emit LeftRating(rating, review);
        state = State.Done;
    }

        /*
    Which function is called, fallback() or receive()?

           send Ether
               |
         msg.data is empty?
              / \
            yes  no
            /     \
receive() exists?  fallback()
         /   \
        yes   no
        /      \
    receive()   fallback()
    */

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

}