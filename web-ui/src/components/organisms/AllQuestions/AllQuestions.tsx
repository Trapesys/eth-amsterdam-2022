import { Box, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import Question from '../../molecules/Question/Question';
import { IQuestionDetails } from '../../molecules/Question/question.types';
import { IAllQuestionsProps } from './allQuestions.types';

const AllQuestions: FC<IAllQuestionsProps> = () => {
  const classes = useStyles();

  const questions: IQuestionDetails[] = [
    {
      title: 'Lorem Ipsum?',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo urna, molestie ut ex id, rhoncus egestas diam. Ut mauris eros, sodales ac tortor quis, malesuada vestibulum elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc maximus quam imperdiet est commodo, eget tincidunt lectus bibendum...',
      tags: ['Go', 'Polygon'],
      posterAddress: 'vitalik.eth',
      postingDate: 1650728367,
      amount: 100,
      score: 10,
      isResolved: true
    },
    {
      title: 'Lorem Ipsum?',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo urna, molestie ut ex id, rhoncus egestas diam. Ut mauris eros, sodales ac tortor quis, malesuada vestibulum elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc maximus quam imperdiet est commodo, eget tincidunt lectus bibendum...',
      tags: ['Go', 'Polygon'],
      posterAddress: '0x183775C71c98Cd1321d90d81DA7533dB4FA04F09',
      postingDate: 1650728367,
      amount: 100,
      score: 10,
      isResolved: false
    },
    {
      title: 'Lorem Ipsum?',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo urna, molestie ut ex id, rhoncus egestas diam. Ut mauris eros, sodales ac tortor quis, malesuada vestibulum elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc maximus quam imperdiet est commodo, eget tincidunt lectus bibendum...',
      tags: ['Go', 'Polygon'],
      posterAddress: 'vitalik.eth',
      postingDate: 1650728367,
      amount: 100,
      score: 10,
      isResolved: true
    }
  ];

  return (
    <Box className={classes.questionsWrapper} mb={-4}>
      {questions.map((question, index) => {
        return (
          <Box key={`question-${index}`} mb={4}>
            <Question details={question} />
          </Box>
        );
      })}
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    questionsWrapper: {
      display: 'flex',
      flexDirection: 'column'
    }
  };
});

export default AllQuestions;
