import Container from "common/components/Container";
import Typography from "common/components/Typography";
import Section from "common/components/Section";
import { TryOutData } from "common/data";
import GenesisImage from "common/assets/image/genesis.png";
import { memo, useState } from "react";
import styled from "styled-components";
import themeGet from "@styled-system/theme-get";
import Button from "common/components/Button";
import { openModal } from "@redq/reuse-modal";
import Web3NetworkProvider from "common/ProviderFactory/components/Web3NetworkProvider";
import { getCache, getUser, updateCache } from "api/cache.api";
import AppTitle from "common/components/AppTitle";
import { useEthersSigner } from "common/ProviderFactory/ethers";
import { useAccount, useChainId } from "wagmi";
import {
  Web3QuestOnboardingPluginProvider,
  Web3QuestPluginProvider,
} from "@aut-labs/abi-types";
import { isAllowListed } from "api/auth.api";

const GenesisImageWrapper = styled("img")`
  width: 100%;
  z-index: -1;
  position: fixed;
  left: 50%;
  display: none;
  transform: translateX(-50%);

  img {
    z-index: -1;
  }

  ${themeGet("mediaQueries.md")} {
    display: inherit;
    height: 500px;
    max-width: 662px;
    bottom: calc(500px / 2 * -1);
  }

  ${themeGet("mediaQueries.xxl")} {
    display: inherit;
    height: 720px;
    max-width: 892px;
    bottom: calc(720px / 2 * -1);
  }
`;

const ButtonWrapper = styled("div")`
  display: flex;
  grid-gap: 20px;
  flex-direction: column;

  ${themeGet("mediaQueries.sm")} {
    flex-direction: row;
    justify-content: center;
  }
`;

export const toHex = (num) => {
  const val = Number(num);
  return `0x${val.toString(16)}`;
};

const updatePhases = async (items, address) => {
  const cache = await getCache("UserPhases", address);

  return items.map((item, index) => {
    const cacheItemFromList = cache?.list?.find((u) => u.phase === index + 1);
    return {
      ...item,
      complete: cacheItemFromList?.status === 1,
    };
  });
};

const AutConnect = ({ onConnected, config, networks }) => {
  const { connector, isConnected, address } = useAccount();
  const [loadingOwnerBtn, setLoadingOwnerBtn] = useState(false);
  const [loadingMemberBtn, setLoadingMemberBtn] = useState(false);
  const chainId = useChainId();
  const signer = useEthersSigner({ chainId: chainId });
  const {
    mainSubtitle,
    ownerItems,
    memberItems,
    memberTitle,
    ownerTitle,
    ownerSubtitle,
    memberSubtitle,
    ownerTimeLocks,
    memberTimeLocks,
  } = TryOutData;
  const [errorMessage, setErrorMessage] = useState(false);
  const viewMemberPhases = async () => {
    setLoadingMemberBtn(true);
    const hasMemberCompletedQuest = async (account, cache) => {
      if (!cache) return;

      const [phaseOne, phaseTwo] = cache?.list || [];
      if (phaseOne?.status === 1 && phaseTwo?.status === 0) {
        try {
          const contract = Web3QuestOnboardingPluginProvider(
            cache?.onboardingQuestAddress,
            {
              signer: () => signer,
            }
          );
          const questsPluginAddress = await contract.getQuestsPluginAddress();
          const questContract = Web3QuestPluginProvider(questsPluginAddress, {
            signer: () => signer,
          });
          const hasCompletedAQuest = await questContract.hasCompletedAQuest(
            account,
            cache.questId
          );
          const cacheResult = await getCache("UserPhases", account);
          if (hasCompletedAQuest) {
            cacheResult.list[1].status = 1;
            await updateCache(cacheResult);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    const start = async (account) => {
      const cache = await getCache("UserPhases", account);
      const userProfile = await getUser(cache?.address);
      await hasMemberCompletedQuest(account, cache);
      const startDate = cache?.startDate
        ? new Date(cache?.startDate)
        : new Date();
      const endDate = cache?.endDate
        ? new Date(Number(cache?.endDate))
        : new Date();
      const memberTimeLocksFn = () =>
        memberTimeLocks(startDate, endDate, !!cache?.startDate);
      onConnected({
        connected: true,
        isOwner: false,
        currentPhase: memberTimeLocksFn,
        subtitle: memberSubtitle,
        userProfile,
        title: memberTitle,
        userAddress: account,
        items: await updatePhases(memberItems, account),
      });
      setLoadingMemberBtn(false);
    };

    if (connector?.ready && isConnected) {
      return start(address);
    }

    openPopup(false, async ({ connected, account }, errorMessage) => {
      if (connected) {
        start(account);
      }
      if (errorMessage) {
        setErrorMessage(errorMessage);
      }
    });
  };

  const viewOwnerPhases = async () => {
    setLoadingOwnerBtn(true);
    let errorMsg = "";
    const [network] = networks.filter((d) => !d.disabled);
    let isAllowed = false;
    if (isConnected) {
      try {
        isAllowed = await isAllowListed(
          signer,
          network.contracts.allowListAddress
        );
      } catch (error) {
        errorMsg = error?.message;
      }
    }

    const start = async (account) => {
      const cache = await getCache("UserPhases", account);
      const userProfile = await getUser(cache?.address);
      const startDate = cache?.createdAt
        ? new Date(cache?.createdAt)
        : new Date();
      const ownerTimeLocksFn = () => ownerTimeLocks(startDate);
      onConnected({
        connected: true,
        isOwner: true,
        currentPhase: ownerTimeLocksFn,
        subtitle: ownerSubtitle,
        title: ownerTitle,
        userAddress: account,
        userProfile,
        items: await updatePhases(ownerItems, account),
      });
      setLoadingOwnerBtn(false);
    };

    if (connector?.ready && isConnected && isAllowed) {
      return start(address);
    }

    openPopup(errorMsg, async ({ connected, account }, errorMessage) => {
      if (connected) {
        start(account);
      }
      if (errorMessage) {
        setErrorMessage(errorMessage);
      }
    });
  };

  const openPopup = (errorMessage, callback = () => null) => {
    openModal({
      config: {
        className: "customModal",
        style: {
          transform: "scale(1)",
          border: 0,
          background: "red",
        },
        animationFrom: { transform: "scale(0.3)" }, // react-spring <Spring from={}> props value
        animationTo: { transform: "scale(1)" }, //  react-spring <Spring to={}> props value
        transition: {
          mass: 1,
          tension: 130,
          friction: 26,
        },
        disableDragging: true,
        width: 480,
        height: 480,
      },
      overlayClassName: "customeOverlayClass",
      closeOnClickOutside: false,
      component: Web3NetworkProvider,
      componentProps: {
        errorMessage,
        onClose: callback,
        networks,
      },
    });
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
          <AppTitle
            textAlign="center"
            mb="10px"
            zIndex="1"
            mt={{
              _: "140px",
            }}
            as="h1"
          />
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
            I am a...
          </Typography>

          <ButtonWrapper>
            <Button
              colors="primary"
              variant="roundOutlined"
              title="DAO Operator"
              isLoading={loadingOwnerBtn}
              disabled={loadingOwnerBtn || loadingMemberBtn}
              target="_blank"
              size="normal"
              onClick={viewOwnerPhases}
              minWidth={{
                _: "260px",
              }}
            />

            <Button
              colors="primary"
              variant="roundOutlined"
              title="DAO Contributor"
              isLoading={loadingMemberBtn}
              disabled={loadingOwnerBtn || loadingMemberBtn}
              target="_blank"
              size="normal"
              onClick={viewMemberPhases}
              minWidth={{
                _: "260px",
              }}
            />
          </ButtonWrapper>
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
        <GenesisImageWrapper alt="genesis" src={GenesisImage.src} />
      </Container>
    </Section>
  );
};

export default memo(AutConnect);
