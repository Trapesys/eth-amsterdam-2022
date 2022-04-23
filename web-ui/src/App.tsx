import MomentUtils from '@date-io/moment';
import {CssBaseline} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {withStyles} from '@material-ui/styles';
import React, {useState} from 'react';
import Web3 from 'web3';
import './App.css';
import {SnackbarProvider} from './components/molecules/Snackbar/snackbar.context';
import Web3Context, {IWeb3Context} from './context/Web3Context';
import AppRouter from './router/AppRouter';
import {globalStyles} from './shared/styles/global.styles';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [web3Account, setWeb3Account] = useState<string | null>(null);

  const web3ContextValue: IWeb3Context = {
    web3Context: web3,
    setWeb3Context: setWeb3,

    web3Account,
    setWeb3Account
  };

  return (
    <Web3Context.Provider value={web3ContextValue}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider>
          <ThemeProvider>
            <CssBaseline/>
            <AppRouter/>
          </ThemeProvider>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </Web3Context.Provider>
  );
}

export default withStyles(globalStyles)(App);
