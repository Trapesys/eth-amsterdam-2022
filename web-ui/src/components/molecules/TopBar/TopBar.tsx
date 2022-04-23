import { Box, Container, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import UserMenu from '../UserMenu/UserMenu';
import { ITopBarProps } from './topBar.types';

const TopBar: FC<ITopBarProps> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.topBarOuter}>
      <Container fixed={true} maxWidth={'md'}>
        <Box className={classes.topBarInner}>
          <Box>Logo</Box>
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
    }
  };
});

export default TopBar;