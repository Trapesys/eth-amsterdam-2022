import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import UserMenu from '../UserMenu/UserMenu';
import { ITopBarProps } from './topBar.types';

const TopBar: FC<ITopBarProps> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.topBarOuter}>
      <Container fixed={true} maxWidth={'lg'}>
        <Box className={classes.topBarInner}>
          <Typography className={classes.logo}>
            <span className={classes.logoSpan}>stake</span> Overflow
          </Typography>
          <SearchBar />
          <UserMenu />
        </Box>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    topBarInner: {
      width: '100%',
      height: '70px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    topBarOuter: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
      display: 'flex',
      width: '100%'
    },
    logoSpan: {
      fontWeight: 600,
      fontFamily: 'Poppins'
    },
    logo: {
      fontSize: theme.typography.pxToRem(20)
    }
  };
});

export default TopBar;