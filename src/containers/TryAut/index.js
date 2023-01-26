import Container from "common/components/Container";
import Typography from "common/components/Typography";
import Section from "common/components/Section";
import { BlackHoleWrapper, BubbleImageWrapper, Grid } from "./try.style";
import { TryOutData } from "common/data";
import AutCircle from "./circle";
import { memo } from "react";

const TryAut = ({ connectState }) => {
  const { title, subtitle } = TryOutData;

  const isFirst = (index) => index === 0;

  const isPreviousComplete = (index) => {
    if (isFirst(index)) return false;
    return connectState.items[index - 1]?.complete;
  };

  const isCurrentActive = (index) => {
    if (!isPreviousComplete(index) && isFirst(index)) {
      return true;
    }
    return isPreviousComplete(index) && !connectState.items[index]?.complete;
  };

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
            {subtitle}
          </Typography>
        </div>
        <Grid className="wrapper">
          {connectState.items.map(({ front, back, complete }, index) => (
            <BlackHoleWrapper
              key={`item-${index}`}
              className={`item-${index + 1} ${complete ? "complete" : ""} ${
                isCurrentActive(index) ? "current" : ""
              }`}
            >
              <BubbleImageWrapper
                display={{
                  _: "none",
                  md: "inherit",
                }}
                className="image-wrapper"
              >
                <AutCircle
                  complete={complete}
                  current={isCurrentActive(index)}
                  index={index}
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
