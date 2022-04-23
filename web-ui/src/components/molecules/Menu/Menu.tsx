import { Box, makeStyles } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { FC } from 'react';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import { IMenuProps } from './menu.types';

const Menu: FC<IMenuProps> = () => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <SectionTitle title={'Menu'} />
      <MenuButton text={'Home'} startIcon={<HomeRoundedIcon />} />
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {};
});

export default Menu;