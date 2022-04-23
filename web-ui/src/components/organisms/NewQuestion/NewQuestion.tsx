import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useFormik } from 'formik';
import { AbiItem } from 'web3-utils';
import React, { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3Context from '../../../context/Web3Context';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import useSnackbar from '../../molecules/Snackbar/useSnackbar.hook';
import { INewQuestionProps } from './newQuestion.types';
import StakingABI from './../../../contract/Stake.json'
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client';

const IPFS_API_URL = 'https://ipfs.infura.io:5001/api/v0';

const URL = `https://ipfs.io/ipfs/Qmd5Vv6Egjc11LB27qF9dMDg4wCwzZA5GM4oNN1gyqLq1J`;


const NewQuestion: FC<INewQuestionProps> = () => {
  const classes = useStyles();

  const names: string[] = ['Go', 'Polygon', 'The Graph'];

  const { web3Account,web3Context } = useContext(Web3Context);

  const { openSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const address = "0x9428cDde24fdA107944889FE1c298f60DC062975"

  const formik = useFormik({
    initialValues: {
      title: '',
      amount: '',
      question: '',
      tags: [],
    },
    enableReinitialize: true,
    onSubmit: async(values, { resetForm }) => {
      if (web3Account == null || web3Context == null) {
        openSnackbar('Wallet not connected', 'error')

        navigate('/')

        return
      }


      console.log('web3Account', web3Account);
      console.log('values', values);

      const ipfs = create({
        url: IPFS_API_URL
      });

      const amountInEth = Number.parseInt(values.amount) * 10**18

      const result = await ipfs!.add(
          JSON.stringify({
            title: values.title,
            amount: amountInEth,
            body: values.question,
            tags: values.tags,
          })
        );

      console.log('upload to IPFS', {
        title: values.title,
        amount: amountInEth,
        body: values.question,
        tags: values.tags,
      })



      let contract = new web3Context.eth.Contract(
        StakingABI as AbiItem[],
        address,
        {
          from: web3Account as string
        }
      );

      console.log('createQuestion', result.cid.toString(), values.title, values.tags)

      const tx = await contract.methods.createQuestion(result.cid.toString(), values.title, values.tags).send({
        gas: 0,
        value: amountInEth
      });

      console.log('tx', tx)

      resetForm();

      openSnackbar('Posted new question!', 'success')


      navigate('/');
    }
  });

  // TODO uncomment
  // useEffect(() => {
  //   if (!web3Account) {
  //     navigate('/');
  //
  //     openSnackbar('Wallet not connected', 'error');
  //   }
  // }, []);


  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    formik.setFieldValue('tags', event.target.value as string[])
  };

  return (
    <Box className={classes.newQuestionWrapper} mt={6}>
      <Box display={'flex'} flexDirection={'column'} width={'100%'}>
        <Box display={'flex'} alignItems={'center'}>
          <IconButton
            onClick={() => {
              navigate('/');
            }}
          >
            <ArrowBackRoundedIcon />
          </IconButton>
          <SectionTitle title={'New Question'} large />
        </Box>

        <Box mt={2} width={'100%'}>
          <form autoComplete={'off'} onSubmit={formik.handleSubmit}>
            <Box display={'flex'} width={'100%'}>
              <Box minHeight={'80px'} width={'auto'} mr={4}>
                <TextField
                  id={'title'}
                  label={'Title'}
                  variant={'outlined'}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  style={{
                    width: '300px'
                  }}
                />
              </Box>
              <Box width={'auto'}>
                <TextField
                  id={'amount'}
                  label={'Amount'}
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">EDGE</InputAdornment>
                    )
                  }}
                  variant={'outlined'}
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                  style={{
                    width: '300px'
                  }}
                />
              </Box>
            </Box>
            <Box display={'flex'} width={'100%'}>
              <FormControl
                style={{
                  width: '50%'
                }}
              >
                <InputLabel>Tags</InputLabel>
                <Select
                  labelId={'tags-label'}
                  id={'tags'}
                  multiple
                  variant={'outlined'}
                  value={formik.values.tags}
                  onChange={handleChange}
                  input={
                    <Input
                      style={{
                        width: '100%'
                      }}
                    />
                  }
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250
                      }
                    }
                  }}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display={'flex'} width={'100%'} mt={4}>
              <TextField
                id={'question'}
                label={'Question Body'}
                variant={'outlined'}
                rows={10}
                style={{
                  width: '80%',
                  fontSize: '0.875rem'
                }}
                size={'small'}
                multiline
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.question && Boolean(formik.errors.question)
                }
                helperText={formik.touched.question && formik.errors.question}
                value={formik.values.question}
              />
            </Box>

            <Box ml={'auto'} width={'100%'} mt={4}>
              <Button
                variant={'contained'}
                color={'secondary'}
                className={classes.submitButton}
                endIcon={<SendRoundedIcon />}
                type={'submit'}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    newQuestionWrapper: {
      display: 'flex',
      width: '80%',
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    submitButton: {
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(16),
      borderRadius: '15px'
    }
  };
});

export default NewQuestion;
