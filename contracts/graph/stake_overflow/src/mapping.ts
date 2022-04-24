import { BigInt } from "@graphprotocol/graph-ts";
import {
  NewAnswerAdded,
  NewQuestionAdded,
  QuestionClosed,
  Rewarded,
  StakedToQuestion,
} from "../generated/StakeOverflow/StakeOverflow";
import { Question, Answer, Contributor } from "../generated/schema";

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
  question.createdBlockHash = event.block.hash.toHexString();
  question.createdBlockTimestamp = event.block.timestamp.toI32();
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
  answer.createdBlockHash = event.block.hash.toHexString();
  answer.createdBlockTimestamp = event.block.timestamp.toI32();
  answer.receivedReward = zero.toString();

  answer.save();

  const contributorID = event.params.answerer.toHexString();
  let contributor = Contributor.load(contributorID);
  if (!contributor) {
    contributor = new Contributor(contributorID);
    contributor.numAnswered = 0;
    contributor.numRewarded = 0;
    contributor.totalReward = zero.toString();
  }

  contributor.numAnswered += 1;
  contributor.save();
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

    const contributorID = event.params.questioner.toHexString();
    let contributor = Contributor.load(contributorID);
    if (!contributor) {
      contributor = new Contributor(contributorID);
      contributor.numAnswered = 0;
      contributor.numRewarded = 0;
      contributor.totalReward = zero.toString();
    }

    contributor.numRewarded += 1;
    contributor.totalReward = BigInt.fromString(contributor.totalReward)
      .plus(event.params.questionerReward)
      .toString();

    contributor.save();
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

    const contributorID = event.params.answerer.toHexString();
    let contributor = Contributor.load(contributorID);
    if (!contributor) {
      contributor = new Contributor(contributorID);
      contributor.numAnswered = 0;
      contributor.numRewarded = 0;
      contributor.totalReward = zero.toString();
    }

    contributor.numRewarded += 1;
    contributor.totalReward = BigInt.fromString(contributor.totalReward)
      .plus(event.params.answererReward)
      .toString();

    contributor.save();
  }

  if (!answer.rewardedBy) {
    answer.rewardedBy = [];
  }

  const sender = event.params.sender.toHexString();
  if (answer.rewardedBy.indexOf(sender) === -1) {
    answer.rewardedBy.push(sender);
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
  question.closedBlockHash = event.block.hash.toHexString();
  question.closedBlockTimestamp = event.block.timestamp.toI32();

  question.status = "close";
  question.save();
}
