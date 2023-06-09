import Container from "common/components/Container";
import Typography from "common/components/Typography";
import Section from "common/components/Section";
import { BlackHoleWrapper, BubbleImageWrapper, Grid } from "./try.style";
import AutCircle from "./circle";
import { memo, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCache } from "api/cache.api";
import AppTitle from "common/components/AppTitle";
import { AutIDContext } from "common/components/ClaimAutId";

const TryAut = ({ connectState }) => {
  const router = useRouter();
  const { dispatch } = useContext(AutIDContext);
  const [cache, setCache] = useState();
  const [items, setItems] = useState(connectState.items);

  const isFirst = (index) => index === 0;

  const isPreviousComplete = (index) => {
    if (isFirst(index)) return false;
    return items[index - 1]?.complete;
  };

  const isCurrentPhase = (index) => {
    if (!isPreviousComplete(index) && isFirst(index)) {
      return true;
    }
    return isPreviousComplete(index) && !items[index]?.complete;
  };

  const phaseStatuses = (index, complete, stayUnlockedUntilPhase) => {
    const isCurrent = isCurrentPhase(index, complete);
    const isCurrentComplete = !!complete;

    let status = {
      isCurrent,
      isComplete: isCurrentComplete,
    };

    if (!isCurrentComplete) {
      const currentTimelock = connectState.currentPhase();
      const isInCurrentTimelock = currentTimelock?.phase === index + 1;
      const isInPreviousTimelock = currentTimelock?.phase === index;
      const notStarted = currentTimelock?.phase === 0;

      if (isInCurrentTimelock) {
        status.label = "Start";
        if (!isFirst(index) && !isPreviousComplete(index)) {
          status.label = "Locked";
        }
      } else if (isInPreviousTimelock && isPreviousComplete(index)) {
        status.isCurrent = false;
        status.unlocksIn = new Date(currentTimelock.endDate);
      } else if (notStarted && isCurrent) {
        status.isCurrent = false;
        status.unlocksIn = new Date(currentTimelock.endDate);
      } else {
        status.isCurrent = false;
        status.label = "Locked";
        const canStayUnlocked =
          currentTimelock?.phase === stayUnlockedUntilPhase;
        if (canStayUnlocked) {
          status.isCurrent = true;
          status.label = "Start";
        }
      }
    } else if (isCurrentComplete) {
      status.label = "Completed";
    }
    return status;
  };

  const buildQuery = ({ queryParams, cacheParams }) => {
    const qParams = (queryParams || []).reduce((prev, curr) => {
      prev[curr] = router.query[curr];
      return prev;
    }, {});

    const cParams = (cacheParams || []).reduce((prev, curr) => {
      prev[curr] = (cache || {})[curr];
      return prev;
    }, {});

    return new URLSearchParams({
      ...qParams,
      ...cParams,
    });
  };

  useEffect(() => {
    const start = async () => {
      try {
        const c = await getCache("UserPhases");
        dispatch({
          type: "SET_DAO_ADDRESS",
          payload: {
            daoAddress: c?.daoAddress,
            isOwner: connectState?.isOwner,
          },
        });

        const updatedItems = items.map((item, index) => {
          const cacheItemFromList = c?.list?.find((u) => u.phase === index + 1);
          return {
            ...item,
            complete: cacheItemFromList?.status === 1,
          };
        });
        setCache(c);
        setItems(updatedItems);
      } catch (error) {}
    };
    start();
    const interval = setInterval(() => {
      start();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      mt={{
        _: "100px",
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
            fontFamily="var(--fractul-alt-bold))"
            color="white"
            whiteSpace="nowrap"
          >
            {connectState?.title}
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
            {connectState?.subtitle}
          </Typography>
        </div>
        <Grid className="wrapper">
          {items.map(
            (
              {
                front,
                back,
                complete,
                button,
                success,
                stayUnlockedUntilPhase,
              },
              index
            ) => (
              <BlackHoleWrapper
                key={`item-${index}`}
                className={`item-${index + 1} ${complete ? "complete" : ""} ${
                  phaseStatuses(index, complete, stayUnlockedUntilPhase)
                    ?.isCurrent
                    ? "current"
                    : ""
                }`}
              >
                <BubbleImageWrapper className="image-wrapper">
                  <AutCircle
                    index={index}
                    success={success}
                    button={button}
                    query={buildQuery(button)}
                    front={front}
                    back={back}
                    {...phaseStatuses(index, complete, stayUnlockedUntilPhase)}
                  />
                </BubbleImageWrapper>
              </BlackHoleWrapper>
            )
          )}
        </Grid>
      </Container>
    </Section>
  );
};

export default memo(TryAut);
