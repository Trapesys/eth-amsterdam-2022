import {
  Box,
  Button,
  Divider,
  IconButton,
  makeStyles
} from '@material-ui/core';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClient } from 'urql';
import Config from '../../../config';
import LoadingIndicator from '../../atoms/LoadingIndicator/LoadingIndicator';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import Answer from '../../molecules/Answer/Answer';
import AnswerField from '../../molecules/AnswerField/AnswerField';
import Question from '../../molecules/Question/Question';
import { IQuestionFetchResult } from '../../molecules/Question/question.types';
import useSnackbar from '../../molecules/Snackbar/useSnackbar.hook';
import { IQuestionPageProps } from './questionPage.types';

const QuestionPage: FC<IQuestionPageProps> = () => {
  const { contentID } = useParams();

  const navigate = useNavigate();

  const constructQuery = (id: string) => {
    return `
    {
 questions(where: {id: "${id}"}){
    id
    questioner
    uri
    title
    tags
    createdBlockTimestamp
    closedBlockTimestamp
    status
    currentStaked
    totalReward
    answers {
      id
      answerer
      uri
      createdBlockTimestamp
      receivedReward
    }
  }
}
    `;
  };

  const [fetchedQuestionData, setFetchedQuestionData] =
    useState<IQuestionFetchResult>({
      questions: []
    });

  const graphQLClient = createClient({
    url: Config.GRAPH_URL
  });

  const { openSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (contentID) {
      const fetchData = async () => {
        return await graphQLClient
          .query(constructQuery(contentID as string))
          .toPromise();
      };

      fetchData()
        .then((data) => {
          const castData: IQuestionFetchResult = data.data;

          setFetchedQuestionData(castData);
          setLoading(false);
        })
        .catch((err) => {
          openSnackbar('Unable to fetch question data', 'error');
        });
    }
  }, [contentID]);

  if (loading) {
    return <LoadingIndicator />;
  }

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
      <Question details={fetchedQuestionData.questions[0]} />
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
        <AnswerField contentID={fetchedQuestionData.questions[0].id} />
      </Box>

      <Box mb={4}>
        <SectionTitle title={'Community Answers'} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} width={'100%'} mb={-4}>
        {fetchedQuestionData.questions[0].answers.map((answer, index) => {
          return (
            <Box key={`question-${answer.id}-${index}`} mb={4}>
              <Answer details={answer} />
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
