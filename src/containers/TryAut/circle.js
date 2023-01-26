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

const AutCircle = ({ front, back, complete, current, index }) => {
  const [isFlipped, setFlipped] = useState(false);

  const onMouseEnter = () => setFlipped(true)
  const onMouseLeave = () => setFlipped(false)

  return (
    <div className="inner-content">
      <img alt="black-hole" src={BlackHoleImage.src} />
      <Flipcard
        isFlipped={isFlipped}
        {...((complete || current) && {
          onMouseEnter,
          onMouseLeave
        })}
        containerClassName={`${isFlipped ? "flipped" : ""}`}
      >
        <AutCardFront
          className={`aut-card-front ${isFlipped ? "flipped" : ""}`}
        >
          <AutCardContainer className="aut-card-container front">
            <Typography
              fontWeight="normal"
              fontFamlily="FractulRegular"
              mt="0"
              mb="0"
              color="white"
              as="subtitle1"
            >
              {index + 1}. {front.title}
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
              src={front.icon}
            />
            <Typography
              fontWeight="normal"
              textAlign="center"
              fontFamlily="FractulRegular"
              mt="0"
              mb="0"
              color="white"
              as="subtitle2"
            >
              {front.subtitle}
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
              fontFamlily="FractulRegular"
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
        title={complete ? 'Completed' : 'Start'}
        target="_blank"
        size="normal"
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{
          position: "absolute",
          bottom: "30px"
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
