import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  InputBase,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import React, { FC, useRef, useState } from 'react';
import { createClient } from 'urql';
import Config from '../../../config';
import theme from '../../../theme/theme';
import LoadingIndicator from '../../atoms/LoadingIndicator/LoadingIndicator';
import useSnackbar from '../Snackbar/useSnackbar.hook';
import { ISearchBarProps } from './searchBar.types';

const Searchbar: FC<ISearchBarProps> = () => {
  const classes = useStyles();

  const anchorRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

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

  const constructSearchQuery = (searchTerm: string) => {
    return `
        {
      questions(where: {title_contains: "${searchTerm}"}) {
        id
        uri
        title
      }
    }
    `;
  };

  const graphQLClient = createClient({
    url: Config.GRAPH_URL
  });

  const fetchSearchResults = async () => {
    const query = constructSearchQuery(searchValue);

    return await graphQLClient.query(query).toPromise();
  };

  const renderIdentitiesSection = (identities: any) => {
    if (identities && identities.length > 0) {
      return (
        <Box display={'flex'} flexDirection={'column'}>
          <Box>
            <Typography>Search results</Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} width={'100%'}>
            {identities.map((result: any) => {
              return (
                <>
                  <Button
                    key={result}
                    classes={{
                      root: classes.buttonOverride
                    }}
                  >
                    <Box
                      display={'flex'}
                      padding={'10px 15px'}
                      style={{ textAlign: 'left' }}
                    >
                      <Box>{result}</Box>
                    </Box>
                  </Button>
                  <Divider />
                </>
              );
            })}
          </Box>
        </Box>
      );
    }
  };

  const handleSearch = () => {
    if (searchValue) {
      setOpen(true);

      fetchSearchResults()
        .then((data) => {
          let items = [];

          let identities = renderIdentitiesSection(data);
          if (identities) {
            items.push(identities);
          }

          setSearchItems(items);
        })
        .catch((err) => {
          openSnackbar('Unable to fetch search results', 'error');
        });
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
        style={{ zIndex: '9999' }}
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps}>
            <ClickAwayListener onClickAway={handleClose}>
              <Box
                width={'600px'}
                style={{
                  backgroundColor: '#fdfdfd',
                  padding: '10px 15px',
                  borderRadius: '15px',
                  boxShadow: '0 8px 16px 0 rgb(0 0 0 / 20%)'
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
