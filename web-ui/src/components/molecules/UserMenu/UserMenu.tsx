import { Box, Button, Typography } from '@material-ui/core';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import { FC, useContext } from 'react';
import Web3Context from '../../../context/Web3Context';
import { IUserMenuProps } from './userMenu.types';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useState, useEffect } from 'react';
import useSnackbar from '../Snackbar/useSnackbar.hook';

const UserMenu: FC<IUserMenuProps> = () => {
  const [walletName, setWalletName] = useState<string>('Connect Wallet');
  const { openSnackbar } = useSnackbar();

  const { web3Context, web3Account, setWeb3Account, setWeb3Context } =
    useContext(Web3Context);

  useEffect(() => {
    if (web3Account != null && web3Context != null) {
      setWalletName(web3Account);
    }
  }, [web3Account, web3Context]);

  const handleWeb3Connect = async () => {
    //  Create WalletConnect Provider
    const Provider = new WalletConnectProvider({
      rpc: {
        100: 'https://rpc-edgenet.polygon.technology/'
        // ...
      },
      qrcodeModalOptions: {
        mobileLinks: [
          'rainbow',
          'metamask',
          'argent',
          'trust',
          'imtoken',
          'pillar'
        ]
      }
    });
    const web3 = new Web3(Provider as any);
    await Provider.enable().catch((err) => {
      console.log(err);
    });

    const accounts = await web3.eth.getAccounts();
    openSnackbar("Wallet connected", "success");
    // Subscribe to accounts change
    Provider.on('accountsChanged', (accounts: string[]) => {
      setWeb3Account(accounts[0]);
    });

    // Subscribe to session disconnection
    Provider.on('disconnect', (code: number, reason: string) => {
      localStorage.removeItem('walletconnect');
      setWalletName("Connect Wallet");
      openSnackbar("Wallet disconnected", "success");
    });

    setWeb3Account(accounts[0]);
    setWeb3Context(web3);
  };

  const renderButtonText = () => {
    if (walletName.startsWith('0x')) {
      return (
        <Box width={'100px'} className={'truncate'}>
          <Typography className={'truncate'}>{walletName}</Typography>
        </Box>
      );
    }

    return walletName;
  };

  return (
    <Box>
      <Button
        variant={'outlined'}
        color={'secondary'}
        onClick={handleWeb3Connect}
        startIcon={<AccountBalanceWalletRoundedIcon />}
        style={{
          borderRadius: '10px'
        }}
      >
        {renderButtonText()}
      </Button>
    </Box>
  );
};

export default UserMenu;
