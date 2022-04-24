import { Box, makeStyles } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { createClient } from 'urql';
import Config from '../../../config';
import LoadingIndicator from '../../atoms/LoadingIndicator/LoadingIndicator';
import Question from '../../molecules/Question/Question';
import { IQuestionFetchResult } from '../../molecules/Question/question.types';
import useSnackbar from '../../molecules/Snackbar/useSnackbar.hook';
import { IAllQuestionsProps } from './allQuestions.types';

const AllQuestions: FC<IAllQuestionsProps> = () => {
  const classes = useStyles();

  const allQuestionsQuery = `
        {
      questions {
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
      }
    }
    `;

  const graphQLClient = createClient({
    url: Config.GRAPH_URL
  });

  const [fetchedQuestions, setFetchedQuestions] =
    useState<IQuestionFetchResult>({
      questions: []
    });

  const [loading, setLoading] = useState<boolean>(true);

  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchQuestions = async () => {
      return await graphQLClient.query(allQuestionsQuery).toPromise();
    };

    fetchQuestions()
      .then((data) => {
        console.log(data);
        const questionData: IQuestionFetchResult = data.data;

        if (!data.error) {
          setFetchedQuestions(questionData);
        }
      })
      .catch((err) => {
        console.log(err);
        openSnackbar('Unable to fetch questions', 'error');
      });

    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Box className={classes.questionsWrapper} mb={-4}>
      {fetchedQuestions.questions.map((question, index) => {
        return (
          <Box key={`question-${index}`} mb={4}>
            <Question details={question} />
          </Box>
        );
      })}
      {fetchedQuestions.questions.length < 1 && <Box>No results found</Box>}
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
