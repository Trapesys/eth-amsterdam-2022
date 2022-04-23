import { makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import { ISectionTitleProps } from './sectionTitle.types';

const SectionTitle: FC<ISectionTitleProps> = (props) => {
  const { large = true, title } = props;

  const classes = useStyles();

  return <Typography className={classes.sectionTitle}>{title}</Typography>;
};

const useStyles = makeStyles((theme) => {
  return {
    sectionTitle: {
      color: theme.palette.custom.darkGray,
      fontFamily: 'Poppins',
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(16)
    }
  };
});

export default SectionTitle;