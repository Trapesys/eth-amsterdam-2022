import { Box, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { IQuestionProps } from './question.types';

const Question: FC<IQuestionProps> = (props) => {
  const classes = useStyles();

  return <Box>BoxBox</Box>;
};

const useStyles = makeStyles((theme) => {
  return {};
});

export default Question;
