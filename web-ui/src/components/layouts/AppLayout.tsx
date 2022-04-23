import { Box, Container } from '@material-ui/core';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../molecules/TopBar/TopBar';
import { IAppLayoutProps } from './appLayout.types';

const AppLayout: FC<IAppLayoutProps> = (props) => {
  return (
    <Box width={'100%'} height={'100%'}>
      <TopBar />
      <Container maxWidth={'lg'} fixed={true}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default AppLayout;
