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
import { IAnswerProps } from './answer.types';

const Answer: FC<IAnswerProps> = (props) => {
  const { details } = props;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <MenuItem onClick={handleClose}>Mark as helpful</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box mb={2}>
        {
          // TODO change
        }
        <Typography>{'TEXT'}</Typography>
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