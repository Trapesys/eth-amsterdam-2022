export interface IAnswerProps {
  contentID: string;
}

export interface IAnswerDetails {
  text: string;
  author: string;
  isMarkedBest: boolean;
  createdAt: number;
  score?: number;
}
