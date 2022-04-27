import {
  Box,
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
import { IAnswerProps } from './answer.types';

const Answer: FC<IAnswerProps> = (props) => {
  const { details, questionID } = props;

  const classes = useStyles();

  const { web3Account, web3Context } = useContext(Web3Context);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  interface IPFSAnswerData {
    body: string;
  }

  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [description, setDescription] = useState<string>('');

  const handleMarkUseful = async (questionID: string, answerID: string) => {
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

      console.log(questionID);
      console.log(answerID);
      await contract.methods.rewardFromPool(questionID, answerID).send({
        gas: 0
      });

      navigate('/');

      openSnackbar('Answer successfully rewarded', 'success');
    } catch (err) {
      openSnackbar('Unable to award answer', 'error');
    }
  };

  const stringReplacer = (input: string) => {
    return input.replace('https://ipfs.io', 'https://infura-ipfs.io');
  };
  //details.uri

  useEffect(() => {
    fetch(stringReplacer(details.uri))
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setDescription((data as IPFSAnswerData).body);
      })
      .catch((err) => {
        openSnackbar('Unable to fetch question body', 'error');
      });
  }, [details]);

  return (
    <Box
      className={clsx(classes.answerWrapper, {
        [classes.answerResolved]: details.receivedReward !== '0'
      })}
    >
      <Box width={'100%'} display={'flex'}>
        <Box ml={'auto'}>
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
                handleMarkUseful(questionID, details.id)
                  .then(() => {
                    openSnackbar(
                      'Successfully marked answer as useful',
                      'success'
                    );
                  })
                  .catch((err) => {
                    console.log(err);

                    openSnackbar('Unable to mark answer as useful', 'error');
                  });

                // TODO check this
                handleClose();
              }}
            >
              Mark as helpful
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box mb={2}>
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
            <Typography className={classes.answerSpecific}>{0}</Typography>
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
          <Box mr={'5px'} maxWidth={'150px'} className={'truncate'}>
            <Typography className={clsx(classes.answerSpecific, 'truncate')}>
              {`${details.answerer} ·`}
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.answerSpecific}>
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
    answerWrapper: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '15px',
      width: '700px',
      padding: '20px 30px 20px 30px',
      backgroundColor: theme.palette.custom.darkWhite,
      boxShadow: theme.palette.boxShadows.darker
    },
    answerResolved: {
      outline: `1px solid ${theme.palette.custom.trapesysGreen}`
    },
    answerSpecific: {
      fontFamily: 'Poppins !important',
      fontSize: theme.typography.pxToRem(16),
      color: theme.palette.custom.darkGray
    }
  };
});

export default Answer;
