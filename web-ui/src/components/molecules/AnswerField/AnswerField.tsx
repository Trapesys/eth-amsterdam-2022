import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import { useFormik } from 'formik';
import { create } from 'ipfs-http-client';
import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AbiItem } from 'web3-utils';
import config from '../../../config';
import Web3Context from '../../../context/Web3Context';
import StakingABI from '../../../contract/Stake.json';
import useSnackbar from '../Snackbar/useSnackbar.hook';
import { IAnswerFieldProps } from './answerFiled.types';

const AnswerField: FC<IAnswerFieldProps> = (props) => {
  const { contentID } = props;

  const classes = useStyles();

  const { openSnackbar } = useSnackbar();

  const { web3Account, web3Context } = useContext(Web3Context);

  const navigate = useNavigate();

  const handleAddAnswer = async (answer: string) => {
    if (web3Account == null || web3Context == null) {
      openSnackbar('Wallet not connected', 'error');
    }

    const ipfs = create({
      url: config.IPFS_API_URL
    });

    const result = await ipfs!.add(
      JSON.stringify({
        body: answer
      })
    );

    // @ts-ignore
    let contract = new web3Context.eth.Contract(
      StakingABI as AbiItem[],
      config.STAKEOVERFLOW_CONTRACT_ADDRESS,
      {
        from: web3Account as string
      }
    );

    await contract.methods.createAnswer(contentID, result.cid.toString()).send({
      gas: 0
    });
  };

  const formik = useFormik({
    initialValues: {
      answer: ''
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      handleAddAnswer(values.answer)
        .then(() => {
          openSnackbar('Answer successfully added', 'success');
        })
        .catch((err) => {
          console.log(err);

          openSnackbar('Unable to add answer', 'error');
        });

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
