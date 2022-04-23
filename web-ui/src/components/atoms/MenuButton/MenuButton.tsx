import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { IMenuButtonProps } from './menuButton.types';

const MenuButton: FC<IMenuButtonProps> = (props) => {
  const classes = useStyles();
  const { text, onClick, startIcon, isActive } = props;

  return (
    <Button
      onClick={onClick}
      className={clsx(classes.menuButtonCommon, {
        [classes.menuButtonActive]: isActive
      })}
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
      fontWeight: 600,
      color: theme.palette.custom.darkGray,
      width: '120px'
    },
    menuButtonActive: {
      color: theme.palette.custom.trapesysGreen,
      backgroundColor: '#F5F5F5'
    }
  };
});

export default MenuButton;