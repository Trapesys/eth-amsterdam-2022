export interface IQuestionProps {
  contentID: string;
}

export interface IQuestionDetails {
  title: string;
  description: string;
  tags: string[];
  posterAddress: string;
  postingDate: number;
  amount: number;
  score: number;
}
