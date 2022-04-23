import { Box } from '@material-ui/core';
import { FC, Fragment } from 'react';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import AllQuestions from '../../organisms/AllQuestions/AllQuestions';
import { IAllQuestionsWrapProps } from './allQuestions.types';

const AllQuestionsWrap: FC<IAllQuestionsWrapProps> = () => {
  return (
    <Fragment>
      <SectionTitle title={'All Questions'} large />
      <Box mt={4}>
        <AllQuestions />
      </Box>
    </Fragment>
  );
};

export default AllQuestionsWrap;