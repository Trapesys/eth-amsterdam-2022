import {
  Badge,
  Box,
  Chip,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import clsx from 'clsx';
import moment from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AbiItem } from 'web3-utils';
import config from '../../../config';
import Web3Context from '../../../context/Web3Context';
import StakingABI from '../../../contract/Stake.json';
import theme from '../../../theme/theme';
import useSnackbar from '../Snackbar/useSnackbar.hook';
import { ReactComponent as Resolved } from './../../../shared/assets/icons/verified_black_24dp.svg';
import { IQuestionProps } from './question.types';

const Question: FC<IQuestionProps> = (props) => {
  const classes = useStyles();
  const { details } = props;

  const { web3Account, web3Context } = useContext(Web3Context);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  interface IPFSQuestionData {
    title: string;
    amount: number;
    body: string;
    tags: string[];
  }

  const [description, setDescription] = useState<string>('');

  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    fetch(details.uri)
      .then((result) => result.json())
      .then((data) => {
        setDescription((data as IPFSQuestionData).body);
      })
      .catch((err) => {
        openSnackbar('Unable to fetch question body', 'error');
      });
  }, [details]);

  const navigate = useNavigate();

  const handleBountyAddition = async () => {
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

      const amountInEth = Number.parseInt('5') * 10 ** 18;

      await contract.methods.stakeToQuestion(details.id).send({
        gas: 0,
        value: amountInEth
      });

      navigate('/');

      openSnackbar('Question successfully staked', 'success');
    } catch (err) {
      openSnackbar('Unable to stake question', 'error');
    }
  };

  const renderTitle = () => {
    if (details.totalReward !== '0') {
      return (
        <Badge badgeContent={<Resolved className={classes.resolvedIcon} />}>
          <Typography className={classes.questionTitle}>
            {details.title}
          </Typography>
        </Badge>
      );
    }

    return (
      <Typography className={classes.questionTitle}>{details.title}</Typography>
    );
  };

  return (
    <Box
      className={clsx(classes.questionWrapper, {
        [classes.questionResolved]: details.totalReward !== '0'
      })}
    >
      <Box display={'flex'} alignItems={'center'}>
        {renderTitle()}
        <Box display={'flex'} flexWrap={'wrap'} mr={'-5px'} ml={'auto'}>
          {details.tags.map((tag, index) => {
            return (
              <Box mr={'5px'}>
                <Chip
                  key={`chip-${details.title}-question-tag-${index}`}
                  label={tag}
                  variant={'outlined'}
                />
              </Box>
            );
          })}
        </Box>
        <Box>
          <IconButton onClick={handleClick}>
            <ExpandMoreRoundedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleBountyAddition()
                  .then(() => {
                    openSnackbar('Successfully added bounty', 'success');
                  })
                  .catch((err) => {
                    console.log(err);

                    openSnackbar('Unable to add bounty', 'error');
                  });

                handleClose();
              }}
            >
              Add to bounty
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box my={2}>
        <Typography>{description}</Typography>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <Box display={'flex'} alignItems={'center'}>
          <IconButton>
            <ArrowUpwardRoundedIcon
              style={{
                fill: theme.palette.custom.darkGray
              }}
            />
          </IconButton>
          <Box mx={1}>
            <Typography className={classes.questionSpecific}>{0}</Typography>
          </Box>
          <IconButton>
            <ArrowDownwardRoundedIcon
              style={{
                fill: theme.palette.custom.darkGray
              }}
            />
          </IconButton>
        </Box>

        <Box display={'flex'} alignItems={'center'} ml={'auto'}>
          <Box mr={'5px'} display={'flex'}>
            <Typography className={classes.questionSpecific}>
              {`${+details.totalReward + +details.currentStaked} ETH ·`}
            </Typography>
          </Box>
          <Box mr={'5px'} maxWidth={'150px'} className={'truncate'}>
            <Typography className={clsx(classes.questionSpecific, 'truncate')}>
              {`${details.questioner} ·`}
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.questionSpecific}>
              {moment.unix(details.createdBlockTimestamp).format('DD.MM.YYYY.')}
            </Typography>
          </Box>
        </Box>
      </Box>
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
      padding: '20px 30px 20px 30px',
      backgroundColor: theme.palette.custom.darkWhite,
      boxShadow: theme.palette.boxShadows.darker
    },
    questionResolved: {
      outline: `1px solid ${theme.palette.custom.trapesysGreen}`
    },
    resolvedIcon: {
      fill: theme.palette.custom.trapesysGreen,
      width: '16px',
      height: 'auto',
      marginLeft: '10px'
    },
    questionTitle: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(20)
    },
    questionSpecific: {
      fontFamily: 'Poppins !important',
      fontSize: theme.typography.pxToRem(16),
      color: theme.palette.custom.darkGray
    }
  };
});

export default Question;
