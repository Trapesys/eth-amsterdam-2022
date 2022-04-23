import { Box, Button } from '@material-ui/core';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import { FC, useContext } from 'react';
import Web3Context from '../../../context/Web3Context';
import { IUserMenuProps } from './userMenu.types';

const UserMenu: FC<IUserMenuProps> = () => {
  const { web3Context, web3Account } = useContext(Web3Context);

  if (web3Account != null && web3Context != null) {
    // Account is active, show the address
  }

  return (
    <Box>
      <Button
        variant={'outlined'}
        color={'secondary'}
        startIcon={<AccountBalanceWalletRoundedIcon />}
        style={{
          borderRadius: '10px'
        }}
      >
        Connect Wallet
      </Button>
    </Box>
  );
};

export default UserMenu;
