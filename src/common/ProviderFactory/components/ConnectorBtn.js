import { useEffect } from "react";
import WalletConnectLogo from "common/assets/image/wallet-connect.svg";
import MetamaskLogo from "common/assets/image/metamask.svg";
import { metaMaskConnector, walletConnectConnector } from "../web3.connectors";
import Text from "common/components/Text";
import Button from "common/components/Button";
import Image from "common/components/Image";
import styled from "styled-components";

export const ConnectorTypes = {
  WalletConnect: "walletConnect",
  Metamask: "metamask",
};

const wallets = {
  [ConnectorTypes.Metamask]: metaMaskConnector,
  [ConnectorTypes.WalletConnect]: walletConnectConnector,
};

const btnConfig = {
  [ConnectorTypes.Metamask]: {
    label: "Metamask",
    icon: <Image src={MetamaskLogo.src} alt="Aut Logo" />,
  },
  [ConnectorTypes.WalletConnect]: {
    label: "WalletConnect",
    icon: <Image src={WalletConnectLogo.src} />,
  },
};

const AutButton = styled(Button)({
  fontSize: "1.56rem",
  width: "16.25rem",
  height: "3.438rem",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "15px",
  ".btn-text": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    margin: 0,
  },
});

const AutButtonTxt = styled(Text)({
  flex: 1,
  margin: 0,
});

const getConnector = (type) => {
  return wallets[type];
};

export default function ConnectorBtn({ connectorType, setConnector }) {
  const [connector] = getConnector(connectorType);

  return (
    <AutButton
      onClick={async () => {
        await connector.activate();
        setConnector(connector);
      }}
      title={
        <>
          {btnConfig[connectorType].icon}
          <AutButtonTxt content={btnConfig[connectorType].label} />
        </>
      }
    />
  );
}
