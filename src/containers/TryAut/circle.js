import Image from "common/components/Image";
import Flipcard from "common/components/FlipCard/FlipCard";
import styled from "styled-components";
import { memo, useContext, useState } from "react";
import Typography from "common/components/Typography";
import BlackHoleImage from "common/assets/image/black-hole.svg";
import Button from "common/components/Button";
import LockCountdown from "common/components/LockCountdown";
import Link from "common/components/Link";
import { AutIDContext } from "common/components/ClaimAutId";
import { trimAddress } from "common/utils/misc";

const dispatchEvent = (name, payload = null) => {
  const event = new CustomEvent(name, {
    composed: true,
    cancelable: true,
    bubbles: true,
    detail: payload,
  });
  window.dispatchEvent(event);
};

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
  // justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const AutCardBack = styled("div")({
  height: "100%",
  width: "100%",
});

const Status = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  position: "absolute",
  bottom: "0px",
});

const AutCircle = ({
  front,
  back,
  label,
  unlocksIn,
  isComplete,
  isCurrent,
  button,
  query,
  index,
  success,
}) => {
  const value = useContext(AutIDContext);
  const [isFlipped, setFlipped] = useState(false);

  const onMouseEnter = () => setFlipped(true);
  const onMouseLeave = () => setFlipped(false);

  // const timelocks = useMemo(() => ownerTimeLocks());

  return (
    <div className="inner-content">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="black-hole" src={BlackHoleImage.src} />
      <Flipcard
        isFlipped={isFlipped}
        {...(isCurrent &&
          !isComplete && {
            onMouseEnter,
            onMouseLeave,
          })}
        containerClassName={`${isFlipped ? "flipped" : ""} ${
          isComplete ? "complete" : ""
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
              {index + 1}. {isComplete ? success.title : front.title}
            </Typography>
            <Image
              width={{
                _: "40px",
                md: "50px",
                xl: "60px",
                xxl: "120px",
              }}
              my={{
                _: "10px",
                md: "20px",
                xxl: "30px",
              }}
              alt="circle-icon"
              src={isComplete ? success.icon : front.icon}
            />
            {front?.showDao && value?.state?.daoAddress && (
              <Link textDecoration="underline" legacyBehavior href={`https://mumbai.polygonscan.com/address/${value?.state?.daoAddress}`}>
                <Button
                  title={trimAddress(value?.state?.daoAddress)}
                  variant="text"
                  colors="nav"
                  style={{
                    textDecoration:"underline"
                  }}
                  as="a"
                  target="_blank"
                  href={`https://mumbai.polygonscan.com/address/${value?.state?.daoAddress}`}
                />
              </Link>
            )}
            <Typography
              fontWeight="normal"
              textAlign="center"
              fontFamlily="var(--fractul-regular)"
              mt="0"
              mb="0"
              color="white"
              as="subtitle2"
            >
              {isComplete ? success.subtitle : front.subtitle}
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

      <Status>
        {!!unlocksIn ? (
          <>
            <Typography
              fontWeight="normal"
              fontFamlily="var(--fractul-regular)"
              mt="0"
              mb="1"
              color="white"
              as="subtitle2"
            >
              Unlocks in
            </Typography>
            <LockCountdown to={unlocksIn} />
          </>
        ) : (
          <>
            {!isComplete ? (
              <>
                {isCurrent ? (
                  <>
                    {button?.type === "webcomponent" && (
                      <Button
                        colors="primary"
                        variant="roundOutlined"
                        title="Claim AutId"
                        onClick={() => {
                          dispatchEvent("aut-open");
                        }}
                        size="normal"
                        display="flex"
                        alignItems="center"
                        style={{
                          justifyContent: "center",
                          textAlign: "center",
                          position: "absolute",
                          bottom: "30px",
                        }}
                        mb="0"
                        minWidth={{
                          _: "220px",
                        }}
                      />
                    )}
                    {button?.type === "link" && (
                      <Button
                        colors="primary"
                        variant="roundOutlined"
                        title={label}
                        as="a"
                        target="_blank"
                        href={`${button?.link}/?${query}`}
                        size="normal"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                          justifyContent: "center",
                          textAlign: "center",
                          position: "absolute",
                          bottom: "30px",
                        }}
                        mb="0"
                        maxWidth={{
                          _: "260px",
                        }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      colors="primary"
                      variant="roundOutlined"
                      title={label}
                      size="normal"
                      display="flex"
                      disabled
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        justifyContent: "center",
                        textAlign: "center",
                        position: "absolute",
                        bottom: "30px",
                      }}
                      mb="0"
                      minWidth={{
                        _: "220px",
                      }}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  colors="primary"
                  variant="roundOutlined"
                  title={label}
                  size="normal"
                  disabled
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    position: "absolute",
                    bottom: "30px",
                  }}
                  mb="0"
                  minWidth={{
                    _: "220px",
                  }}
                />
              </>
            )}
          </>
        )}
      </Status>
    </div>
  );
};

export default memo(AutCircle);
