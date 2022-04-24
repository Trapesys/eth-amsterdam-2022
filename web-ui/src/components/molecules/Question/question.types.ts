export interface IQuestionProps {
  details: IQuestionDetails;
}

export interface IQuestionDetails {
  id: string;
  questioner: string;
  uri: string;
  title: string;
  tags: string[];
  createdBlockTimestamp: number;
  status: string;
  currentStaked: string;
  totalReward: string;
  answers: IAnswerDetailed[];
}

export interface IQuestionFetchResult {
  questions: IQuestionDetails[];
}

export interface IAnswerDetailed {
  id: string;
  answerer: string;
  uri: string;
  createdBlockTimestamp: number;
  receivedReward: string;
}
