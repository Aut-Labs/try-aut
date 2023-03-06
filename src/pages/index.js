import React, { useState } from "react";
import TryAut from "containers/TryAut";
import Footer from "containers/Footer";
import AutConnect from "containers/Connect";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import AutSDK from "@aut-labs-private/sdk";
import { getAppConfig } from "api/index.api";
import { useEffect } from "react";
import { Loading } from "common/components/ModalPopupWrapper";
import { DAppProvider, MetamaskConnector } from "@usedapp/core";
import { WalletConnectConnector } from "@usedapp/wallet-connect-connector";
import { ethers } from "ethers";

const generateConfig = (networks) => {
  const readOnlyUrls = networks.reduce((prev, curr) => {
    if (!curr.disabled) {
      const network = {
        name: "mumbai",
        chainId: 80001,
        _defaultProvider: (providers) =>
          new providers.JsonRpcProvider(curr.rpcUrls[0]),
      };
      const provider = ethers.getDefaultProvider(network);
      prev[curr.chainId] = provider;
    }
    return prev;
  }, {});

  return {
    readOnlyUrls,
    networks: networks
      .filter((n) => !n.disabled)
      .map((n) => ({
        isLocalChain: false,
        isTestChain: process.env.NEXT_PUBLIC_NETWORK_ENV === "testing",
        chainId: n.chainId,
        chainName: n.network,
        rpcUrl: n.rpcUrls[0],
        nativeCurrency: n.nativeCurrency,
      })),
    gasLimitBufferPercentage: 50000,
    connectors: {
      metamask: new MetamaskConnector(),
      walletConnect: new WalletConnectConnector({
        infuraId: "d8df2cb7844e4a54ab0a782f608749dd",
      }),
    },
  };
};

const Main = () => {
  const [connectState, setConnectState] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [config, setConfig] = useState(null);
  const [networks, setNetworks] = useState();
  const [error, setError] = useState(false);
  // useEffect(() => {
  //   if (connectors?.length) return;
  //   getAppConfig().then(async (result) => {
  //     const sdk = new AutSDK({
  //       nftStorageApiKey:
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIwQkEyNDNhNTU1YmY4YzI0MzViNzVmMTk0NmFDNWQ2QTY4QUQzMjgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MzkwMjIzNDA2NywibmFtZSI6IlBhcnRuZXJzQXBwIn0.sG-6S0mNp0FQ_4SIimMChrMj4250ymEH58V09eXNY4o",
  //     });
  //     const { metaMaskConnector, walletConnectConnector } =
  //       initializeConnectors(result);
  //     const [metamask, metaMaskHooks] = metaMaskConnector;
  //     const [walletConnect, walletConnectHooks] = walletConnectConnector;

  //     const connectors = [
  //       [metamask, metaMaskHooks],
  //       [walletConnect, walletConnectHooks],
  //     ];
  //     setNetworks(result);
  //     setConnectors(connectors);
  //     setAppReady(true);
  //   });
  // }, [connectors]);

  useEffect(() => {
    if (config) return;
    getAppConfig()
      .then(async (res) => {
        setNetworks(res);
        setConfig(generateConfig(res));
        new AutSDK({
          nftStorageApiKey: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY,
        });
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [config]);

  return (
    <PerfectScrollbar
      options={{
        suppressScrollX: true,
        useBothWheelAxes: false,
        swipeEasing: true,
      }}
      style={{
        height: "100vh",
      }}
    >
      {isLoading || !config ? (
        <Loading />
      ) : (
        <DAppProvider config={config}>
          {!connectState?.connected && (
            <AutConnect
              config={config}
              networks={networks}
              setLoading={setLoading}
              onConnected={(state) => setConnectState(state)}
            />
          )}

          {connectState?.connected && (
            <>
              <TryAut connectState={connectState} />
              <Footer />
            </>
          )}
        </DAppProvider>
      )}
    </PerfectScrollbar>
  );
};
export default Main;
