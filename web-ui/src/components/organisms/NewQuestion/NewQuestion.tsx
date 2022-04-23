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
import React, { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3Context from '../../../context/Web3Context';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import useSnackbar from '../../molecules/Snackbar/useSnackbar.hook';
import { INewQuestionProps } from './newQuestion.types';

const NewQuestion: FC<INewQuestionProps> = () => {
  const classes = useStyles();

  const { web3Account } = useContext(Web3Context);

  const { openSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      amount: '',
      question: ''
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      // TODO submit form
      resetForm();

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

  const names: string[] = ['Go', 'Polygon', 'The Graph'];

  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTags(event.target.value as string[]);
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
                  value={tags}
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

            <Box display={'flex'} width={'100%'} mt={4}>
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
      borderRadius: '15px',
      marginLeft: 'auto !important'
    }
  };
});

export default NewQuestion;
