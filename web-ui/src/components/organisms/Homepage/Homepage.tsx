import { Box } from '@material-ui/core';
import { FC } from 'react';
import Menu from '../../molecules/Menu/Menu';
import { IHomepageProps } from './homepage.types';

const Homepage: FC<IHomepageProps> = () => {
  return (
    <Box display={'flex'}>
      <Menu />
    </Box>
  );
};

export default Homepage;
