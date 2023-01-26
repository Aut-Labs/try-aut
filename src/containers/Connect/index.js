import Container from "common/components/Container";
import Typography from "common/components/Typography";
import Section from "common/components/Section";
import { TryOutData } from "common/data";
import GenesisImage from "common/assets/image/genesis.svg";
import { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import themeGet from "@styled-system/theme-get";
import Button from "common/components/Button";
import {
  Web3AllowListProvider,
  Web3AutDAORegistryProvider,
  Web3DAOExpanderRegistryProvider,
} from "@aut-labs-private/abi-types";
import { ethers } from "ethers";

// For AutDAOs:
// contract: AutDAORegistry
// function: function getAutDAOByDeployer(address deployer) public view returns(address[] memory)
// it returns an array, it should not be empty.

// For Expanded DAOs:
// contract: DAOExpanderRegistry
// function:function getDAOExpandersByDeployer(address deployer) public view returns(address[] memory)

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

const getTimeRemaining = (endtime) => {
  let t = endtime - new Date().getTime();
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

const AutConnect = ({ onConnected, connectors }) => {
  const { title, subtitle, ownerItems, memberItems } = TryOutData;
  const [signing, setSigned] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [startCountDown, setStartCountdown] = useState(false);
  const [countDownMsg, setCountdownMsg] = useState(null);
  const timer = useRef(null);

  const signMessage = async () => {
    setStartCountdown(false);
    setCountdownMsg(null);
    setErrorMessage(null);

    setLoading(true);
    setSigned(true);
    try {
      const [connector] = connectors[0];
      await connector.activate();
      const accounts = await connector.provider.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      await connector.provider.request({
        method: "personal_sign",
        params: ["Sign this message to access the content!", account],
      });

      function isDateOnOrAfter4th() {
        const today = new Date();
        const forthOfJanuary = new Date(2023, 0, 4);
        const isCorrectYear =
          today.getFullYear() >= forthOfJanuary.getFullYear();
        const isCorrectMonth = today.getMonth() >= forthOfJanuary.getMonth();
        const isCorrectDay = today.getDay() >= forthOfJanuary.getDay();

        return isCorrectYear && isCorrectMonth && isCorrectDay;
      }

      const isValid = isDateOnOrAfter4th();

      if (!isValid) {
        setErrorMessage(
          "This phase didn't start yet, mark the date! 2023/01/04"
        );
        setStartCountdown(true);
      }

      onConnected({
        connected: true,
        items: memberItems,
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

  const verifyOwnership = async () => {
    setLoading(true);
    setVerifying(true);
    try {
      const [connector] = connectors[0];
      await connector.activate();
      await EnableAndChangeNetwork(connector.provider);
      const accounts = await connector.provider.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      const provider = new ethers.providers.Web3Provider(connector.provider);
      const signer = provider.getSigner();

      const contract = Web3AllowListProvider(
        "0x3Aa3c3cd9361a39C651314261156bc7cdB52B618",
        {
          signer: () => signer,
        }
      );

      const hasDeployedAnyDAO = async () => {
        const autRegistry = Web3AutDAORegistryProvider(
          "0x2A53276Fc6353CCb3CcEb4103535E004E6ca96F9",
          {
            signer: () => signer,
          }
        );

        const daoExpanderRegistry = Web3DAOExpanderRegistryProvider(
          "0xc3711e4a33e5237948F9CA2bdDe67f3dc980d3d5",
          {
            signer: () => signer,
          }
        );

        const daos = await autRegistry.getAutDAOByDeployer(account);
        const expanderDaos =
          await daoExpanderRegistry.getDAOExpandersByDeployer(account);

        return daos?.length > 0 && expanderDaos?.length > 0;
      };

      for (let item of ownerItems) {
        if (item.validation === "CheckDAO") {
          const hasAnyDao = await hasDeployedAnyDAO();
          item.complete = hasAnyDao;
        }
      }

      console.log(ownerItems, "ownerItems");

      const isAllowed = await contract.isAllowed(account);
      onConnected({
        connected: isAllowed,
        items: ownerItems,
      });
    } catch (error) {
      console.log(error, "error");
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

  useEffect(() => {
    if (startCountDown) {
      const forthOfJanuary = new Date(2023, 0, 4);
      let countdown = getTimeRemaining(forthOfJanuary.getTime());
      setCountdownMsg(
        `${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes and ${countdown.seconds} seconds left`
      );
      timer.current = setInterval(() => {
        countdown = getTimeRemaining(forthOfJanuary.getTime());
        setCountdownMsg(
          `${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes and ${countdown.seconds} seconds left`
        );
      }, 1000);
    } else {
      clearTimeout(timer.current);
    }
  }, [startCountDown, timer]);

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
            {subtitle}
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
              onClick={verifyOwnership}
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
              onClick={signMessage}
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
          <Typography
            fontWeight="bold"
            color="white"
            textAlign="center"
            zIndex="1"
            p="0"
            mt="1"
            as="subtitle2"
          >
            {countDownMsg}
          </Typography>
        </Typography>

        <GenesisImageWrapper src={GenesisImage.src} />
      </Container>
    </Section>
  );
};

export default memo(AutConnect);
