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
import React, { FC, useState } from 'react';
import theme from '../../../theme/theme';
import { IAnswerDetails, IAnswerProps } from './answer.types';

const Answer: FC<IAnswerProps> = (props) => {
  const { contentID } = props;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const answer: IAnswerDetails = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo urna, molestie ut ex id, rhoncus egestas diam. Ut mauris eros, sodales ac tortor quis, malesuada vestibulum elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc maximus quam imperdiet est commodo, eget tincidunt lectus bibendum...',
    author: 'vitalik.eth',
    isMarkedBest: true,
    score: 10,
    createdAt: moment().unix()
  };

  return (
    <Box
      className={clsx(classes.answerWrapper, {
        [classes.answerResolved]: answer.isMarkedBest
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
            <MenuItem onClick={handleClose}>Mark as helpful</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box mb={2}>
        <Typography>{answer.text}</Typography>
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
            <Typography className={classes.answerSpecific}>
              {answer.score}
            </Typography>
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
              {`${answer.author} ·`}
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.answerSpecific}>
              {moment.unix(answer.createdAt).format('DD.MM.YYYY.')}
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