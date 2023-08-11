import styled from "styled-components";
import ModalPopupWrapper from "common/components/ModalPopupWrapper";
import AutLoading from "common/components/AutLoading";
import AppTitle from "common/components/AppTitle";
import Typography from "common/components/Typography";
import { closeModal } from "@redq/reuse-modal";
import Box from "common/components/Box";
import WalletConnectLogo from "common/assets/image/wallet-connect.svg";
import MetamaskLogo from "common/assets/image/metamask.svg";
import Image from "common/components/Image";
import Button from "common/components/Button";
import { useAccount, useConnect } from "wagmi";
import { useState } from "react";
import { walletClientToSigner } from "../ethers";
import { isAllowListed } from "api/auth.api";

const DialogInnerContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  gridGap: "30px",
});

const ErrorWrapper = styled(Box)({
  backgroundColor: "rgba(254, 202, 202, 0.16)",
  padding: "20px",
  width: "80%",
  marginBottom: "12px",
  borderRadius: "16px",
});

const btnConfig = {
  metaMask: {
    label: "metaMask",
    icon: <Image src={MetamaskLogo.src} alt="Metamask logo" />,
  },
  walletConnect: {
    label: "WalletConnect",
    icon: <Image src={WalletConnectLogo.src} alt="Wallet Connect Logo" />,
  },
};

const ConnectButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;
`;

const Web3NetworkProvider = ({ errorMessage = "", onClose, networks }) => {
  const { connector, isReconnecting } = useAccount();
  const [errorMsg, setErrMessage] = useState(errorMessage);
  const { connectAsync, connectors, error, isLoading } = useConnect();

  const closeDialog = async (connected, account, signer, errorMessage = null) => {
    setErrMessage("");
    const [network] = networks.filter((d) => !d.disabled);
    let isAllowed = false;
    if (connected) {
      try {
        isAllowed = await isAllowListed(
          signer,
          network.contracts.allowListAddress
        );
      } catch (error) {
        setErrMessage(error?.message);
      }
    }

    if (isAllowed) {
      closeModal();
      onClose({ connected, account }, errorMessage);
    }
  };

  return (
    <ModalPopupWrapper>
      <>
        <AppTitle
          mb={{
            xs: "16px",
            lg: "24px",
            xxl: "32px",
          }}
          variant="h2"
        />

        {isLoading && (
          <div style={{ position: "relative", flex: 1 }}>
            <AutLoading width="130px" height="130px" />
          </div>
        )}

        {!isLoading && (
          <>
            <Typography
              m="0"
              fontFamily="var(--fractul-regular)"
              color="white"
              as="subtitle1"
            >
              Connect your wallet
            </Typography>
            <DialogInnerContent>
              {connectors.map((c) => (
                <ConnectButton
                  disabled={
                    !c.ready || isReconnecting || c.id === connector?.id
                  }
                  key={c.id}
                  onClick={async () => {
                    const client = await connectAsync({
                      connector: c,
                      chainId: c.chains[0].id,
                    });

                    client.transport = client.provider;
                    const signer = walletClientToSigner(client);
                    closeDialog(true, client?.account, signer);
                  }}
                  colors="primary"
                  iconPosition="left"
                  icon={
                    <span
                      style={{
                        display: "flex",
                        height: "30px",
                        width: "30px",
                      }}
                    >
                      {btnConfig[c.id]?.icon}
                    </span>
                  }
                  variant="roundOutlined"
                  title={c.name}
                  size="normal"
                  minWidth={{
                    _: "185px",
                    lg: "200px",
                    xxl: "440px",
                  }}
                />
              ))}
            </DialogInnerContent>
            {(error?.message || errorMsg) && (
              <ErrorWrapper>
                <Typography
                  m="0"
                  textAlign="center"
                  fontFamily="var(--fractul-regular)"
                  color="error"
                  as="body"
                >
                  {error?.message || errorMsg}
                </Typography>
              </ErrorWrapper>
            )}
          </>
        )}
      </>
    </ModalPopupWrapper>
  );
};

export default Web3NetworkProvider;
