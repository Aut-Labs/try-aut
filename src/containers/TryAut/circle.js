import Image from "common/components/Image";
import Flipcard from "common/components/FlipCard/FlipCard";
import styled from "styled-components";
import { memo, useState } from "react";
import Typography from "common/components/Typography";
import BlackHoleImage from "common/assets/image/black-hole.svg";
import Button from "common/components/Button";

const AutCardFront = styled("div")({
  width: "100%",
  height: "100%",
});

const AutCardContainer = styled("div")({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const AutCardBack = styled("div")({
  height: "100%",
  width: "100%",
});

const AutCircle = ({
  front,
  back,
  complete,
  current,
  button,
  query,
  index,
  success,
}) => {
  const [isFlipped, setFlipped] = useState(false);

  const onMouseEnter = () => setFlipped(true);
  const onMouseLeave = () => setFlipped(false);

  return (
    <div className="inner-content">
      <img alt="black-hole" src={BlackHoleImage.src} />
      <Flipcard
        isFlipped={isFlipped}
        {...((complete || current) && {
          onMouseEnter,
          onMouseLeave,
        })}
        containerClassName={`${isFlipped ? "flipped" : ""} ${
          complete ? "complete" : ""
        }`}
      >
        <AutCardFront
          className={`aut-card-front ${isFlipped ? "flipped" : ""}`}
        >
          <AutCardContainer className="aut-card-container front">
            <Typography
              fontWeight="normal"
              fontFamlily="var(--fractul-regular)"
              mt="0"
              mb="0"
              color="white"
              as="subtitle1"
            >
              {index + 1}. {complete ? success.title : front.title}
            </Typography>
            <Image
              height={{
                _: "40px",
                md: "50px",
                xl: "60px",
                xxl: "120px",
              }}
              my={{
                _: "20px",
                md: "30px",
                xxl: "40px",
              }}
              alt="circle-icon"
              src={complete ? success.icon : front.icon}
            />
            <Typography
              fontWeight="normal"
              textAlign="center"
              fontFamlily="var(--fractul-regular)"
              mt="0"
              mb="0"
              color="white"
              as="subtitle2"
            >
              {complete ? success.subtitle : front.subtitle}
            </Typography>
          </AutCardContainer>
        </AutCardFront>
        <AutCardBack className="aut-card-back">
          <AutCardContainer className="aut-card-container back">
            <Typography
              mb="0"
              mt="0"
              textAlign="center"
              fontWeight="normal"
              fontFamlily="var(--fractul-regular)"
              maxWidth={{
                _: "190px",
                xxl: "260px",
              }}
              color="white"
              as="subtitle2"
            >
              {back.description}
            </Typography>
          </AutCardContainer>
        </AutCardBack>
      </Flipcard>
      <Button
        colors="primary"
        variant="roundOutlined"
        disabled={complete || (!current && !complete)}
        title={complete ? "Completed" : "Start"}
        {...(!complete &&
          current && {
            as: "a",
            target: "_blank",
            href: `${button?.link}/?${query}`,
          })}
        size="normal"
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{
          position: "absolute",
          bottom: "30px",
          // ...(complete && {
          //   border: "3px solid #2e7d32"
          // })
        }}
        mb="0"
        maxWidth={{
          _: "260px",
        }}
      />
    </div>
  );
};

export default memo(AutCircle);
