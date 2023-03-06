import Container from "common/components/Container";
import Typography from "common/components/Typography";
import Section from "common/components/Section";
import { TryOutData } from "common/data";
import GenesisImage from "common/assets/image/genesis.svg";
import { memo, useState } from "react";
import styled from "styled-components";
import themeGet from "@styled-system/theme-get";
import Button from "common/components/Button";
import { Web3AllowListProvider } from "@aut-labs-private/abi-types";
import { useConnector, useEthers } from "@usedapp/core";
import { getCache } from "api/index.api";

const GenesisImageWrapper = styled("img")({
  width: "100%",
  zIndex: "-1",
  position: "fixed",
  left: "50%",
  display: "none",
  transform: "translateX(-50%)",
  [themeGet("mediaQueries.md")]: {
    display: "inherit",
    height: "662px",
    maxWidth: "662px",
    bottom: "calc(662px / 2 * -1)",
  },
  [themeGet("mediaQueries.xxl")]: {
    display: "inherit",
    height: "892px",
    maxWidth: "892px",
    bottom: "calc(892px / 2 * -1)",
  },
});

export const toHex = (num) => {
  const val = Number(num);
  return `0x${val.toString(16)}`;
};

const config = {
  name: "Mumbai (Polygon)",
  chainId: 80001,
  network: "Mumbai",
  disabled: false,
  explorerUrls: ["https://explorer-mumbai.maticvigil.com/"],
  rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
};

export const EnableAndChangeNetwork = async (provider) => {
  const params = [
    {
      chainId: toHex(config.chainId),
      chainName: config.network,
      rpcUrls: config.rpcUrls,
      blockExplorerUrls: config.explorerUrls,
    },
  ];

  const [{ chainId }] = params;

  try {
    await provider.request({ method: "eth_requestAccounts" });
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params,
        });
      } catch (addError) {
        throw new Error(addError);
      }
    } else {
      throw new Error(switchError);
    }
  }
};

const updatePhases = async (items, userAddress) => {
  const cache = await getCache(userAddress);
  return items.map((item, index) => {
    const cacheItemFromList = cache?.list?.find((u) => u.phase === index + 1);
    return {
      ...item,
      complete: cacheItemFromList?.status === 1,
    };
  });
};

const AutConnect = ({ onConnected, config, networks }) => {
  const { title, mainSubtitle, ownerItems, memberItems, ownerSubtitle, memberSubtitle } = TryOutData;
  const [signing, setSigned] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { activate } = useConnector();
  const { activateBrowserWallet, switchNetwork } = useEthers();

  const activateNetwork = async () => {
    const [network] = networks.filter((n) => !n.disabled);
    const connector = config.connectors.metamask;
    try {
      activateBrowserWallet({ type: "metamask" });
      await activate(connector);
      await switchNetwork(+network.chainId);
      await EnableAndChangeNetwork(connector.provider.provider);

      const provider = connector.provider.provider;
      const accounts = await connector.provider.provider.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      return { connector, account, provider };
    } catch (error) {
      // handle
    }
    return {};
  };

  const viewMemberPhases = async () => {
    setErrorMessage(null);
    setLoading(true);
    setSigned(true);
    try {
      const { account, provider } = await activateNetwork();
      await provider.request({
        method: "personal_sign",
        params: ["Sign this message to access the content!", account],
      });

      onConnected({
        connected: true,
        subtitle: memberSubtitle,
        userAddress: account,
        items: await updatePhases(memberItems, account),
      });
    } catch (error) {
      if (error?.code === 4001) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
      setSigned(false);
    }
  };

  const viewOwnerPhases = async () => {
    setLoading(true);
    setVerifying(true);
    try {
      const { account, connector, provider } = await activateNetwork();
      await provider.request({
        method: "personal_sign",
        params: ["Sign this message to access the content!", account],
      });

      const signer = connector.provider.getSigner();
      const contract = Web3AllowListProvider(
        "0x3Aa3c3cd9361a39C651314261156bc7cdB52B618",
        {
          signer: () => signer,
        }
      );
      const isAllowed = await contract.isAllowed(account);
      onConnected({
        connected: isAllowed,
        subtitle: ownerSubtitle,
        userAddress: account,
        items: await updatePhases(ownerItems, account),
      });
    } catch (error) {
      if (error?.code === 4001) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "Aw shucks, it looks like you’re not on the Allowlist for this round."
        );
      }
    } finally {
      setLoading(false);
      setVerifying(false);
    }
  };

  return (
    <Section
      style={{
        position: "unset",
      }}
    >
      <Container
        noGutter
        maxWidth={{
          lg: "1180px",
          xl: "1300px",
          xxl: "1900px",
        }}
      >
        <div className="top-part">
          <Typography
            textAlign="center"
            mb="10px"
            zIndex="1"
            mt={{
              _: "140px",
            }}
            as="h1"
          >
            {title}
          </Typography>
          <Typography
            textAlign="center"
            zIndex="1"
            mt="0"
            px={{
              _: "12px",
              sm: "0",
            }}
            mb={{
              _: "60px",
            }}
            as="subtitle1"
          >
            {mainSubtitle}
          </Typography>
        </div>

        <div>
          <Typography
            textAlign="center"
            zIndex="1"
            mt="0"
            fontWeight="bold"
            color="white"
            as="subtitle1"
          >
            I am
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gridGap: "20px",
            }}
          >
            <Button
              colors="primary"
              variant="roundOutlined"
              title="DAO Owner"
              target="_blank"
              size="normal"
              isLoading={verifying}
              disabled={loading}
              onClick={viewOwnerPhases}
              minWidth={{
                _: "260px",
              }}
            />

            <Button
              colors="primary"
              variant="roundOutlined"
              title="DAO Contributor"
              target="_blank"
              size="normal"
              isLoading={signing}
              disabled={loading}
              onClick={viewMemberPhases}
              minWidth={{
                _: "260px",
              }}
            />
          </div>
        </div>

        <Typography
          textAlign="center"
          zIndex="1"
          px={{
            _: "12px",
            sm: "0",
          }}
          mt={{
            _: "60px",
          }}
          as="subtitle2"
        >
          {errorMessage}
        </Typography>
        <GenesisImageWrapper src={GenesisImage.src} />
      </Container>
    </Section>
  );
};

export default memo(AutConnect);
