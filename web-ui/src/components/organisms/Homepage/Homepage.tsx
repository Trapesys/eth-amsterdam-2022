import { Box } from '@material-ui/core';
import { FC } from 'react';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import Menu from '../../molecules/Menu/Menu';
import { IHomepageProps } from './homepage.types';

const Homepage: FC<IHomepageProps> = () => {
  return (
    <Box display={'flex'}>
      <Box mt={6}>
        <Menu />
      </Box>
      <Box mt={6} mx={4}>
        <SectionTitle title={'All Questions'} large />
      </Box>
    </Box>
  );
};

export default Homepage;
