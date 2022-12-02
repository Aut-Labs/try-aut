import React from "react";
import Container from "common/components/Container";
import Typography from "common/components/Typography";
import Section from "common/components/Section";
import Image from "common/components/Image";
import BlackHoleImage from "common/assets/image/black-hole.svg";
import { BlackHoleWrapper, BubbleImageWrapper, Grid } from "./try.style";
import Button from "common/components/Button";
import { TryOutData } from "common/data";

const TryAut = () => {
  const { title, subtitle, items } = TryOutData;
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
        <Typography
          textAlign="center"
          mb="10px"
          mt={{
            _: "140px",
          }}
          as="h1"
        >
          {title}
        </Typography>
        <Typography
          textAlign="center"
          mt="0"
          mb={{
            _: "60px",
          }}
          as="subtitle1"
        >
          {subtitle}
        </Typography>
        <Grid className="wrapper">
          {items.map((item, index) => (
            <BlackHoleWrapper
              key={`item-${index}`}
              className={`item-${index + 1}`}
            >
              <BubbleImageWrapper className="image-wrapper">
                <Image alt="black-hole" src={BlackHoleImage.src} />
              </BubbleImageWrapper>
              <div className="content">
                <Typography mt="0" mb="0" color="white" as="subtitle2">
                  {item.title}
                </Typography>
                <Typography
                  mt={{
                    _: "8px",
                    sm: "16px",
                  }}
                  mb="0"
                  color="white"
                  as="subtitle2"
                >
                  {item.subtitle}
                </Typography>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.descriptions.map((desc, descIndex) => (
                    <Typography
                      key={`desc-${descIndex}`}
                      mt="0"
                      {...(descIndex == item.descriptions.length - 1 && {
                        mb: "0px",
                      })}
                      color="white"
                      as="body2"
                      fontSize={{
                        _: "12px",
                        sm: "16px",
                        xxl: "18px",
                      }}
                    >
                      {desc}
                    </Typography>
                  ))}
                </div>

                <Button
                  colors="primary"
                  variant="roundOutlined"
                  title={item.button.text}
                  target="_blank"
                  href={item.button.link}
                  as="a"
                  size="normal"
                  fontSize={{
                    xxl: "16px",
                  }}
                  paddingTop={{
                    xxl: "12px",
                  }}
                  paddingBottom={{
                    xxl: "12px",
                  }}
                  paddingLeft={{
                    xxl: "48px",
                  }}
                  paddingRight={{
                    xxl: "48px",
                  }}
                />
              </div>
            </BlackHoleWrapper>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default TryAut;
