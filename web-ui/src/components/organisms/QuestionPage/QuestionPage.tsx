import { Box, Button, Divider, IconButton } from '@material-ui/core';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClient } from 'urql';
import { AbiItem } from 'web3-utils';
import config from '../../../config';
import Config from '../../../config';
import Web3Context from '../../../context/Web3Context';
import StakingABI from '../../../contract/Stake.json';
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

  const { web3Account, web3Context } = useContext(Web3Context);

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

  const handleArchive = async () => {
    if (web3Account == null || web3Context == null) {
      openSnackbar('Wallet not connected', 'error');
    }

    try {
      // @ts-ignore
      let contract = new web3Context.eth.Contract(
        StakingABI as AbiItem[],
        config.STAKEOVERFLOW_CONTRACT_ADDRESS,
        {
          from: web3Account as string
        }
      );

      await contract.methods.closeQuestion(contentID).send({
        gas: 0
      });

      navigate('/');

      openSnackbar('Question successfully archived', 'success');
    } catch (err) {
      openSnackbar('Unable to archive question', 'error');
    }
  };

  const isQuestionPoster = () => {
    if (
      web3Account == null ||
      web3Context == null ||
      fetchedQuestionData.questions.length < 1
    ) {
      return false;
    }

    return (
      fetchedQuestionData.questions[0].questioner === (web3Account as string)
    );
  };

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
          {isQuestionPoster() && (
            <Button
              variant={'outlined'}
              color={'primary'}
              startIcon={<ArchiveRoundedIcon />}
              onClick={handleArchive}
            >
              Archive
            </Button>
          )}
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
        <AnswerField contentID={fetchedQuestionData.questions[0].id} />
      </Box>

      <Box mb={4}>
        <SectionTitle title={'Community Answers'} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} width={'100%'} mb={-4}>
        {fetchedQuestionData.questions[0].answers.map((answer, index) => {
          return (
            <Box key={`question-${answer.id}-${index}`} mb={4}>
              <Answer details={answer} questionID={contentID as string} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default QuestionPage;
