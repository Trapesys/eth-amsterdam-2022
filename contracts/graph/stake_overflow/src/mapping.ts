import { BigInt } from "@graphprotocol/graph-ts";
import {
  NewAnswerAdded,
  NewQuestionAdded,
  QuestionClosed,
  Rewarded,
  StakedToQuestion,
} from "../generated/StakeOverflow/StakeOverflow";
import { Question, Answer } from "../generated/schema";

const zero = BigInt.fromI32(0);
const one = BigInt.fromI32(1);

export function handleNewQuestionAdded(event: NewQuestionAdded): void {
  const questionID = event.params.questionID.toHexString();

  let question = Question.load(questionID);
  if (question === null) {
    question = new Question(questionID);
  }

  question.questioner = event.params.questioner.toHexString();
  question.uri = event.params.contentURI;
  question.createdTxHash = event.transaction.hash.toHexString();
  question.status = "open";
  question.title = event.params.title;
  question.tags = event.params.tags;

  if (!question.numAnswers) {
    question.numAnswers = zero.toString();
  }
  if (!question.totalReward) {
    question.totalReward = zero.toString();
  }
  if (!question.receivedReward) {
    question.receivedReward = zero.toString();
  }

  question.save();
}

export function handleStakedToQuestion(event: StakedToQuestion): void {
  const questionID = event.params.questionID.toHexString();

  let question = Question.load(questionID);
  if (question === null) {
    question = new Question(questionID);
  }

  if (!question.currentStaked) {
    question.currentStaked = event.params.amount.toString();
  } else {
    question.currentStaked = BigInt.fromString(question.currentStaked)
      .plus(event.params.amount)
      .toString();
  }

  question.save();
}

export function handleNewAnswerAdded(event: NewAnswerAdded): void {
  const questionID = event.params.questionID.toHexString();
  const answerID = event.params.answerID.toHexString();

  let question = Question.load(questionID);
  if (question === null) {
    question = new Question(questionID);
  }

  if (!question.numAnswers) {
    question.numAnswers = one.toString();
  } else {
    question.numAnswers = BigInt.fromString(question.numAnswers)
      .plus(one)
      .toString();
  }

  question.save();

  let answer = Answer.load(answerID);
  if (answer === null) {
    answer = new Answer(answerID);
  }

  answer.question = questionID;
  answer.answerer = event.params.answerer.toHexString();
  answer.uri = event.params.contentURI;
  answer.createdTxHash = event.transaction.hash.toHexString();
  answer.receivedReward = zero.toString();

  answer.save();
}

export function handleRewarded(event: Rewarded): void {
  const questionID = event.params.questionID.toHexString();
  const answerID = event.params.answerID.toHexString();

  let question = Question.load(questionID);
  if (question === null) {
    question = new Question(questionID);
  }

  if (event.params.questionerReward.notEqual(zero)) {
    if (!question.receivedReward) {
      question.receivedReward = event.params.questionerReward.toString();
    } else {
      question.receivedReward = BigInt.fromString(question.receivedReward)
        .plus(event.params.questionerReward)
        .toString();
    }
  }

  const sumReward = event.params.answererReward.plus(
    event.params.questionerReward
  );
  if (!question.totalReward) {
    question.totalReward = sumReward.toString();
  } else {
    question.totalReward = BigInt.fromString(question.totalReward)
      .plus(sumReward)
      .toString();
  }

  if (event.params.reducedStake.notEqual(zero) && question.currentStaked) {
    question.currentStaked = BigInt.fromString(question.currentStaked)
      .minus(event.params.reducedStake)
      .toString();
  }

  question.save();

  let answer = Answer.load(answerID);
  if (answer === null) {
    answer = new Answer(answerID);
  }

  if (event.params.answererReward.notEqual(zero)) {
    if (answer.receivedReward) {
      answer.receivedReward = event.params.answererReward.toString();
    } else {
      answer.receivedReward = BigInt.fromString(answer.receivedReward)
        .plus(event.params.answererReward)
        .toString();
    }
  }

  answer.save();
}

export function handleQuestionClosed(event: QuestionClosed): void {
  const questionID = event.params.questionID.toHexString();
  const question = new Question(questionID);
  if (!question) {
    return;
  }

  if (event.params.reducedStake.notEqual(zero) && question.currentStaked) {
    question.currentStaked = BigInt.fromString(question.currentStaked)
      .minus(event.params.reducedStake)
      .toString();
  }

  question.closedTxHash = event.transaction.hash.toHexString();

  question.status = "close";
  question.save();
}
