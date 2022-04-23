import { Box, Container, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { ITopBarProps } from './topBar.types';

const TopBar: FC<ITopBarProps> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.topBarOuter}>
      <Container fixed={true} maxWidth={'lg'}>
        <Box className={classes.topBarInner}>
          <Box>Logo</Box>
          <Box>Search box</Box>

          <Box>Connect wallet</Box>
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