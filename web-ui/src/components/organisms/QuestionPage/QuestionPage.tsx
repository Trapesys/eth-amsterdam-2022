import {
  Box,
  Button,
  Divider,
  IconButton,
  makeStyles
} from '@material-ui/core';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import Answer from '../../molecules/Answer/Answer';
import AnswerField from '../../molecules/AnswerField/AnswerField';
import Question from '../../molecules/Question/Question';
import { IQuestionDetails } from '../../molecules/Question/question.types';
import { IQuestionPageProps } from './questionPage.types';

const QuestionPage: FC<IQuestionPageProps> = () => {
  const { contentID } = useParams();

  const navigate = useNavigate();

  const question: IQuestionDetails = {
    title: 'Lorem Ipsum?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo urna, molestie ut ex id, rhoncus egestas diam. Ut mauris eros, sodales ac tortor quis, malesuada vestibulum elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc maximus quam imperdiet est commodo, eget tincidunt lectus bibendum...',
    tags: ['Go', 'Polygon'],
    posterAddress: 'vitalik.eth',
    postingDate: 1650728367,
    amount: 100,
    score: 10,
    isResolved: true
  };

  const answerIDs: string[] = ['123', '123'];

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box display={'flex'} justifyContent={'space-between'} mb={2}>
        <Box display={'flex'} alignItems={'center'}>
          <IconButton
            onClick={() => {
              navigate('/');
            }}
          >
            <ArrowBackRoundedIcon />
          </IconButton>
          <SectionTitle title={'All Questions'} large />
        </Box>
        <Box>
          <Button
            variant={'outlined'}
            color={'primary'}
            startIcon={<ArchiveRoundedIcon />}
          >
            Archive
          </Button>
        </Box>
      </Box>
      <Question details={question} />
      <Box width={'100%'} my={6}>
        <Divider />
      </Box>
      <Box mb={2}>
        <SectionTitle title={'Post an answer'} />
      </Box>
      <Box mb={4}>
        {
          // TODO change
        }
        <AnswerField contentID={question.title} />
      </Box>

      <Box mb={4}>
        <SectionTitle title={'Community Answers'} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} width={'100%'} mb={-4}>
        {answerIDs.map((answerID, index) => {
          return (
            <Box key={`question-${question.title}-${index}`} mb={4}>
              <Answer contentID={answerID} />
            </Box>
          );
        })}
      </Box>
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

export default QuestionPage;
