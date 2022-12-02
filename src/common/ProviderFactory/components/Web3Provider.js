import { Web3ReactProvider } from '@web3-react/core';
import { metaMaskConnector, walletConnectConnector } from '../web3.connectors';

const [metamask, metaMaskHooks] = metaMaskConnector;
const [walletConnect, walletConnectHooks] = walletConnectConnector;

const connectors = [
  [metamask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
];

export default function Web3AutProvider({ children }) {
  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>;
}
