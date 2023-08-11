import { alchemyProvider } from "wagmi/providers/alchemy";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { configureChains, createConfig } from "wagmi";

export const generateNetworkConfig = (network) => {
  const networkDefinition = {
    id: network.chainId,
    name: network.name,
    network: network.network,
    rpcUrls: {
      default: {
        http: network.rpcUrls,
      },
      public: {
        http: network.rpcUrls,
      },
    },
    blockExplorers: {
      etherscan: {
        name: network.name,
        url: network.explorerUrls[0],
      },
      default: {
        name: network.name,
        url: network.explorerUrls[0],
      },
    },
    testnet: true,
  };

  const ankrRPCUrls = {
    [networkDefinition.id]: network.rpcUrls,
  };
  function publicProviderANKR() {
    return function (chain) {
      if (!ankrRPCUrls[chain.id]) return null;
      return {
        chain: chain,
        rpcUrls: { http: ankrRPCUrls[chain.id] },
      };
    };
  }

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [networkDefinition],
    [
      alchemyProvider({ apiKey: "G742dEaaWF0gE-SL0IlEFAJdlA_l7ezJ" }),
      publicProviderANKR(),
    ]
  );

  const wagmiConfig = createConfig({
    autoConnect: true,
    logger: {
      warn: console.warn,
    },
    connectors: [
      new MetaMaskConnector({
        chains,
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: "938429658f5e53a8eaf88dc70e4a8367",
          qrModalOptions: {
            themeVariables: {
              // @ts-ignore
              "--wcm-z-index": 9999,
            },
          },
        },
      }),
    ],
    publicClient,
    webSocketPublicClient,
  });

  return wagmiConfig;
};
