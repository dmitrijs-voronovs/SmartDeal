export const contractStateEnum = {
	Init: "Init",
	ProtectionFromClient: "ProtectionFromClient",
	ProtectionFromAgent: "ProtectionFromAgent",
	PayForTask: "PayForTask",
	TaskInProgress: "TaskInProgress",
	TaskEvaluation: "TaskEvaluation",
	ProtectionMoneyBack: "ProtectionMoneyBack",
	ReviewsAndRatings: "ReviewsAndRatings",
	Done: "Done",
};

const contractStates = [
	contractStateEnum.Init,
	contractStateEnum.ProtectionFromClient,
	contractStateEnum.ProtectionFromAgent,
	contractStateEnum.PayForTask,
	contractStateEnum.TaskInProgress,
	contractStateEnum.TaskEvaluation,
	contractStateEnum.ProtectionMoneyBack,
	contractStateEnum.ReviewsAndRatings,
	contractStateEnum.Done,
];

export const getContractState = (stateIdx) => contractStates[stateIdx];
export const getStateIdx = (stateEnum) =>
	contractStates.findIndex((e) => stateEnum === getContractState(e));
