import Container from "common/components/Container";
import Typography from "common/components/Typography";
import Section from "common/components/Section";
import { BlackHoleWrapper, BubbleImageWrapper, Grid } from "./try.style";
import { TryOutData } from "common/data";
import AutCircle from "./circle";
import { memo, useEffect, useState } from "react";
import { getCache } from "api/index.api";
import { useRouter } from "next/router";

const TryAut = ({ connectState }) => {
  const { title } = TryOutData;
  const router = useRouter();
  const [cache, setCache] = useState();
  const [items, setItems] = useState(connectState.items);

  const isFirst = (index) => index === 0;

  const isPreviousComplete = (index) => {
    if (isFirst(index)) return false;
    return items[index - 1]?.complete;
  };

  const isCurrentActive = (index) => {
    if (!isPreviousComplete(index) && isFirst(index)) {
      return true;
    }
    return isPreviousComplete(index) && !items[index]?.complete;
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
      ...cParams
    });
  };

  useEffect(() => {
    const start = async () => {
      const c = await getCache(connectState?.userAddress);
      const updatedItems = items.map((item, index) => {
        const cacheItemFromList = c?.list?.find((u) => u.phase === index + 1);
        return {
          ...item,
          complete: cacheItemFromList?.status === 1,
        };
      });
      setCache(c);
      setItems(updatedItems);
    };
    start();
    const timeout = setInterval(() => {
      start();
    }, 5000);
    return () => clearTimeout(timeout);
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
            {connectState?.subtitle}
          </Typography>
        </div>
        <Grid className="wrapper">
          {items.map(({ front, back, complete, button, success }, index) => (
            <BlackHoleWrapper
              key={`item-${index}`}
              className={`item-${index + 1} ${complete ? "complete" : ""} ${
                isCurrentActive(index) ? "current" : ""
              }`}
            >
              <BubbleImageWrapper className="image-wrapper">
                <AutCircle
                  complete={complete}
                  current={isCurrentActive(index)}
                  index={index}
                  success={success}
                  button={button}
                  query={buildQuery(button)}
                  front={front}
                  back={back}
                />
              </BubbleImageWrapper>
            </BlackHoleWrapper>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default memo(TryAut);
