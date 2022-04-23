import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import Menu from '../../molecules/Menu/Menu';
import { ReactComponent as Resolved } from './../../../shared/assets/icons/verified_black_24dp.svg';
import { IHomepageProps } from './homepage.types';
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client';

const API_URL = 'https://ipfs.infura.io:5001/api/v0';
const URL = `https://ipfs.io/ipfs/Qmd5Vv6Egjc11LB27qF9dMDg4wCwzZA5GM4oNN1gyqLq1J`;

const Homepage: FC<IHomepageProps> = () => {
  const classes = useStyles();

  // useEffect(() => {
  //   let ipfs: IPFSHTTPClient | undefined;
  //   try {
  //     ipfs = create({
  //       url: API_URL
  //     });

  //     (async () => {
  //       const result = await ipfs!.add(
  //         JSON.stringify({
  //           title: 'Hello',
  //           content: 'World'
  //         })
  //       );
  //       console.log('result', result);

  //       const x = CID(result.cid.toString());
  //     })();
  //   } catch (error) {
  //     console.error('IPFS error ', error);
  //     ipfs = undefined;
  //   }

  //   console.log('ipfs', ipfs);
  // }, []);

  const contributors: {
    address: string;
    answered: number;
  }[] = [
    {
      address: '0xbE23BEf0f4d054051cAD9C8ae8Adfbc9731B3Ad4',
      answered: 50
    },
    {
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      answered: 39
    },
    {
      address: '0x144c18E4EB76D8fa6db9Ca94eedaD94aC2cb9987',
      answered: 20
    },
    {
      address: '0x29ADE05Ea5143458d276Dbd0f141eeeF4DF12Fa1',
      answered: 10
    },
    {
      address: '0x23554DfFf9BE7D29b69ECdC62E666A7D4536d410',
      answered: 5
    }
  ];

  return (
    <Box display={'flex'} justifyContent={'space-between'} mt={6}>
      <Box>
        <Menu />
      </Box>
      <Box mx={4}>
        <Outlet />
      </Box>
      <Box>
        <SectionTitle title={'Get Started'} />
        <Box mt={4}>
          <Link to={'/new'}>
            <Button
              variant={'contained'}
              color={'secondary'}
              className={classes.postButton}
            >
              Post a question
            </Button>
          </Link>
        </Box>
        <Box display={'flex'} flexDirection={'column'} mb={-2} mt={6}>
          <Box mb={2}>
            <SectionTitle title={'Top Contributors'} />
          </Box>
          {contributors.map((contributor, index) => {
            return (
              <Box
                key={`contributor-${index}`}
                display={'flex'}
                alignItems={'center'}
                mb={2}
                maxWidth={'250px'}
              >
                <Typography className={classes.contributor}>{`${
                  index + 1
                }.`}</Typography>
                <Box mx={1} className={'truncate'}>
                  <Typography className={clsx(classes.contributor, 'truncate')}>
                    {contributor.address}
                  </Typography>
                </Box>
                <Box mr={'5px'}>
                  <Typography className={classes.contributor}>
                    {contributor.answered}
                  </Typography>
                </Box>
                <Resolved className={classes.resolvedIcon} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    postButton: {
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(16),
      fontFamily: 'Poppins',
      borderRadius: '15px',
      padding: '15px 30px',
      boxShadow: 'none',
      cursor: 'pointer'
    },
    resolvedIcon: {
      width: '40px',
      height: 'auto'
    },
    contributor: {
      fontWeight: 500,
      fontFamily: 'Poppins !important'
    }
  };
});

export default Homepage;
