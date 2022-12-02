import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import AutLogo from "common/assets/image/aut-logo.svg";
import Image from "common/components/Image";
import ConnectorBtn, { ConnectorTypes } from "./ConnectorBtn";
import Text from "common/components/Text";
import Alert from "common/components/Alert";
import styled from "styled-components";
import ModalPopupWrapper, {
  Loading,
} from "common/components/ModalPopupWrapper";
import { NetworkSelectors } from "./NetworkSelectors";
import { environment, getNetworkVariables } from "api/environment";
import { EnableAndChangeNetwork } from "../web3.network";
import { closeModal } from "@redq/reuse-modal";

const Title = styled(Text)`
  letter-spacing: 3px,
  font-weight: bold;
  color: white;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.563rem;
  margin-bottom: 1.563rem;
`;

const DialogInnerContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});

function truncate(input) {
  if (input.length > 120) {
    return input.substring(0, 120) + "...";
  }
  return input;
}

const Web3NetworkProvider = ({ onClose = () => false }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [networkConfig, setNetworkConfig] = useState();
  const [wallet, setWallet] = useState(null);
  const [connector, setConnector] = useState(null);
  const { isActive, provider, account } = useWeb3React();

  const switchNetwork = async (chainId, index, name = null) => {
    if (!connector) {
      return;
    }
    setErrorMessage(null);
    setLoading(true);
    await connector.deactivate();
    const networkName = name || environment.networks.split(",")[index];
    await connector.activate(chainId);
    const config = getNetworkVariables(networkName);
    try {
      await EnableAndChangeNetwork(connector.provider, config);
      setNetworkConfig(config);
    } catch (error) {
      setNetworkConfig(null);
    }
    setLoading(false);

    closeModal();
    onClose();
  };

  const selectWallet = (c, w) => {
    setWallet(w);
    setConnector(c);
  };


  return (
    <ModalPopupWrapper>
      <>
        <Image
          style={{ margin: "0 auto 1.56rem auto" }}
          src={AutLogo.src}
          width="80"
          height="80"
        />

        {!wallet ? (
          <>
            <Title content="Connect wallet" />
            <DialogInnerContent>
              <ConnectorBtn
                connectorType={ConnectorTypes.Metamask}
                setConnector={(c) => selectWallet(c, ConnectorTypes.Metamask)}
              />
              <ConnectorBtn
                connectorType={ConnectorTypes.WalletConnect}
                setConnector={(c) =>
                  selectWallet(c, ConnectorTypes.WalletConnect)
                }
              />
            </DialogInnerContent>
          </>
        ) : (
          <>
            {loading ? (
              <div
                style={{
                  position: "relative",
                }}
              >
                <Loading />
              </div>
            ) : (
              <>
                {!networkConfig && (
                  <DialogInnerContent>
                    <NetworkSelectors
                      onSelect={async (foundChainId, networkName) => {
                        switchNetwork(foundChainId, null, networkName);
                      }}
                    />
                  </DialogInnerContent>
                )}
              </>
            )}

            {!loading && errorMessage && (
              <Alert color="red">{truncate(errorMessage)}</Alert>
            )}
          </>
        )}
      </>
    </ModalPopupWrapper>
  );
};

export default Web3NetworkProvider;
