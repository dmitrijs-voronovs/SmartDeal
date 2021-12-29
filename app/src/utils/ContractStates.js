export const contractStateEnum = {
    Init: "Init",
    ProtectionFromClient: "ProtectionFromClient",
    ProtectionFromAgent: "ProtectionFromAgent",
    TaskMoney: "TaskMoney",
    TaskInProgress: "TaskInProgress",
    TaskEvaluation: "TaskEvaluation",
    ProtectionMoneyBack: "ProtectionMoneyBack",
    ReviewsAndRatings: "ReviewsAndRatings",
    MoneyToAnotherParty: "MoneyToAnotherParty",
    Done: "Done",
}

const contractStates = [
    contractStateEnum.Init,
    contractStateEnum.ProtectionFromClient,
    contractStateEnum.ProtectionFromAgent,
    contractStateEnum.TaskMoney,
    contractStateEnum.TaskInProgress,
    contractStateEnum.TaskEvaluation,
    contractStateEnum.ProtectionMoneyBack,
    contractStateEnum.ReviewsAndRatings,
    contractStateEnum.MoneyToAnotherParty,
    contractStateEnum.Done,
];

export const getContractState = stateIdx => contractStates[stateIdx];