import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import useSnackbar from '../Snackbar/useSnackbar.hook';
import { IAnswerFieldProps } from './answerFiled.types';

const AnswerField: FC<IAnswerFieldProps> = (props) => {
  const { contentID } = props;

  const classes = useStyles();

  const { openSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      answer: ''
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      // TODO submit form
      openSnackbar('Answer submitted!', 'success');

      resetForm();
    }
  });

  return (
    <Box display={'flex'} className={classes.questionWrapper}>
      <form autoComplete={'off'} onSubmit={formik.handleSubmit}>
        <Box display={'flex'} width={'100%'} mt={4}>
          <TextField
            id={'answer'}
            label={'Answer Body'}
            variant={'outlined'}
            rows={10}
            style={{
              width: '100%',
              fontSize: '0.875rem'
            }}
            size={'small'}
            multiline
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.answer && Boolean(formik.errors.answer)}
            helperText={formik.touched.answer && formik.errors.answer}
            value={formik.values.answer}
          />
        </Box>

        <Box mt={2} display={'flex'} width={'100%'}>
          <Button
            variant={'contained'}
            color={'secondary'}
            className={classes.submitButton}
            endIcon={<CommentRoundedIcon />}
            type={'submit'}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    questionWrapper: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '15px',
      width: '700px',
      padding: '10px 20px 10px 20px',
      backgroundColor: theme.palette.custom.darkWhite,
      boxShadow: theme.palette.boxShadows.darker
    },
    submitButton: {
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(16),
      borderRadius: '15px',
      marginLeft: 'auto !important'
    }
  };
});

export default AnswerField;
