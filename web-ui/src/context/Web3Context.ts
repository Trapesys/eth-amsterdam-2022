import { createContext } from 'react';
import Web3 from 'web3';

export interface IWeb3Context {
  web3Context: Web3 | null;
  setWeb3Context: (web3Ref: Web3 | null) => void;

  web3Account: string | null;
  setWeb3Account: (account: string | null) => void;
}

const Web3Context = createContext<IWeb3Context>({
  web3Context: null,
  setWeb3Context: (web3Ref: Web3 | null) => {},

  web3Account: null,
  setWeb3Account: (account: string | null) => {}
});

export default Web3Context;

export const Web3ContextConsumer = Web3Context.Consumer;
