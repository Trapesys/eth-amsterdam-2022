import {
  Box,
  ClickAwayListener,
  Grow,
  InputBase,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import React, { FC, useRef, useState } from 'react';
import theme from '../../../theme/theme';
import LoadingIndicator from '../../atoms/LoadingIndicator/LoadingIndicator';
import useSnackbar from '../Snackbar/useSnackbar.hook';
import { ISearchBarProps } from './searchBar.types';

const Searchbar: FC<ISearchBarProps> = () => {
  const classes = useStyles();

  const anchorRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const id = open ? 'search-popover' : undefined;

  const handleClose = (event: any) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const [searchItems, setSearchItems] = useState<any>(null);

  const [searchValue, setSearchValue] = useState<string>('');

  const { openSnackbar } = useSnackbar();

  const handleSearch = () => {
    if (searchValue) {
      // TODO search
    } else {
      setOpen(false);
    }
  };

  const renderSearchItems = () => {
    if (searchItems && searchItems.length > 0) {
      return searchItems;
    } else if (searchItems && searchItems.length == 0) {
      return (
        <Typography>
          <i>No search results</i>
        </Typography>
      );
    } else {
      return <LoadingIndicator size={20} />;
    }
  };

  return (
    <Paper component={'form'} className={classes.searchBar} ref={anchorRef}>
      <SearchRoundedIcon
        style={{
          fill: theme.palette.custom.darkGray
        }}
      />

      <InputBase
        className={classes.input}
        placeholder={'Search'}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        onKeyUp={() => {
          handleSearch();
        }}
      />

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement={'bottom-start'}
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps}>
            <ClickAwayListener onClickAway={handleClose}>
              <Box
                width={'400px'}
                style={{
                  backgroundColor: theme.palette.custom.darkGray,
                  padding: '10px 15px',
                  borderRadius: '15px'
                }}
              >
                {renderSearchItems()}
              </Box>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    searchBar: {
      display: 'flex',
      minWidth: '60%', // TODO change this to be more dynamic
      alignItems: 'center',
      borderRadius: '10px',
      padding: '10px 15px',
      backgroundColor: '#EDEDED',
      boxShadow: 'none',
      outline: 'none',
      '&:focus-within': {
        boxShadow: theme.palette.boxShadows.darker
      }
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    buttonOverride: {
      justifyContent: 'left'
    }
  };
});

export default Searchbar;
