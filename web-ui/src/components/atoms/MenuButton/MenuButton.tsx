import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { IMenuButtonProps } from './menuButton.types';

const MenuButton: FC<IMenuButtonProps> = (props) => {
  const classes = useStyles();
  const { text, onClick, startIcon } = props;

  return (
    <Button
      onClick={onClick}
      className={clsx(classes.menuButtonCommon, classes.menuButtonActive)}
      color={'secondary'}
      startIcon={startIcon}
    >
      {text}
    </Button>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    menuButtonCommon: {
      fontFamily: 'Poppins',
      fontWeight: 600
    },
    menuButtonActive: {}
  };
});

export default MenuButton;