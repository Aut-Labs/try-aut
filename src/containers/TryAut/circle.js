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
import { autUrls, trimAddress, trimLink } from "common/utils/misc";
import { ic_content_copy_outline } from "react-icons-kit/md/ic_content_copy_outline";
import { Icon } from "react-icons-kit";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "rc-tooltip";

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
  userProfile,
  isCurrent,
  button,
  query,
  index,
  success,
}) => {
  const value = useContext(AutIDContext);
  const [isFlipped, setFlipped] = useState(false);

  const [copied, setCopied] = useState(false);

  function clickCopy(copied) {
    if (copied === true) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } else {
      return null;
    }
  }

  const onMouseEnter = () => setFlipped(true);
  const onMouseLeave = () => setFlipped(false);
  const urls = autUrls();

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
            {front?.showDao && value?.state?.daoAddress && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "50px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    textDecoration="underline"
                    legacyBehavior
                    href={`https://mumbai.polygonscan.com/address/${value?.state?.daoAddress}`}
                  >
                    <Button
                      title={trimAddress(value?.state?.daoAddress)}
                      variant="text"
                      colors="nav"
                      style={{
                        textDecoration: "underline",
                      }}
                      as="a"
                      target="_blank"
                      href={`https://mumbai.polygonscan.com/address/${value?.state?.daoAddress}`}
                    />
                  </Link>
                </div>
                <CopyToClipboard
                  text={value?.state?.daoAddress}
                  onCopy={() => clickCopy(true)}
                >
                  <div
                    style={{
                      color: "white",
                      height: "50px",
                      width: "50px",
                      marginLeft: "5px",
                      background: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "15px",
                        cursor: "pointer",
                      }}
                    >
                      <Tooltip
                        placement="top"
                        overlay={copied ? "Copied!" : "Copy Address"}
                      >
                        <Icon
                          color="white"
                          size={25}
                          icon={ic_content_copy_outline}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </CopyToClipboard>
              </div>
            )}
            {front?.showMyAut &&
              isComplete &&
              (userProfile?.name || userProfile?.address) && (
                <>
                  <div
                    style={{
                      display: "flex",
                      height: "50px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      textDecoration="underline"
                      legacyBehavior
                      href={`${urls.myAut}${
                        userProfile?.name || userProfile?.address
                      }`}
                    >
                      <Button
                        title={trimLink(
                          `${urls.myAut}${
                            userProfile?.name || userProfile?.address
                          }`
                        )}
                        variant="text"
                        colors="nav"
                        style={{
                          textTransform: "none",
                          textDecoration: "underline",
                        }}
                        as="a"
                        target="_blank"
                        href={`${urls.myAut}${
                          userProfile?.name || userProfile?.address
                        }`}
                      />
                    </Link>
                  </div>
                </>
              )}
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
                        href={`${button?.link}${query}`}
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
