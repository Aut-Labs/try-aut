import React from "react";
import { FooterData } from "common/data";
import NewsletterForm from "common/components/NewsletterForm/NewsletterForm";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import NextLink from "next/link";
import Container from "common/components/Container";
import {
  AboutUs,
  ContactInfo,
  FooterWidget,
  Grid,
  Social,
  FooterSection,
  FooterWidgetItem,
  SocialLinks,
} from "./footer.style";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import Logo from "common/components/UIElements/Logo";
import Typography from "common/components/Typography";
import Button from "common/components/Button";
import Image from "common/components/Image";
import BubbleImage from "common/assets/image/bubble.svg";
import Bubble from "common/components/Bubble";

const logoStyles = {
  color: "#262626",
  display: {
    _: "none",
    md: "inherit"
  },
  height: {
    _: "42px",
    xs: "42px",
    sm: "42px",
    md: "42px",
    xxl: "56px",
  },
  width: {
    _: "186px",
    xs: "186px",
    sm: "186px",
    md: "186px",
    xxl: "252px",
  },
};

const SocialWrapper = ({ socialStyles, socialLinksStyles }) => {
  const { social } = FooterData;
  return (
    <Social {...socialStyles}>
      <SocialLinks {...socialLinksStyles}>
        {social.map(({ link, icon, name }, index) => (
          <Tooltip
            placement="top"
            key={`footer-social-key-${index}`}
            overlay={name}
          >
            <a href={link} target="_blank">
              <Image
                height={{
                  _: "25px",
                  md: "26px",
                  xxl: "40px",
                }}
                width={{
                  _: "25px",
                  md: "26px",
                  xxl: "40px",
                }}
                src={icon.src}
                alt="social image"
              />
            </a>
          </Tooltip>
        ))}
      </SocialLinks>
    </Social>
  );
};

const Footer = () => {
  const { logo, copyright, widgets, mailchimpUrl } = FooterData;
  return (
    <FooterSection as="footer">
      <Bubble src={BubbleImage.src} />
      <Container
        noGutter
        maxWidth={{
          lg: "1180px",
          xl: "1300px",
          xxl: "1600px",
        }}
      >
        <Grid
          gridTemplateColumns={{
            _: "1fr",
            // sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
            lg: "1fr 1fr 1fr 0.5fr",
          }}
          py={{
            _: "30px",
            xs: "35px",
            md: "40px",
            xxl: "52px",
          }}
        >
          <AboutUs
            alignItems={{
              _: "center",
              md: "start",
              // sm: "start",
            }}
          >
            <NextLink href="/" shallow>
              <Logo logoSrc={logo} alt="Aut Logo" logoStyle={logoStyles} />
            </NextLink>
            <SocialWrapper
              socialStyles={{
                display: {
                  _: "none",
                  md: "inherit",
                  lg: "none",
                },
                alignItems: "center",
              }}
              socialLinksStyles={{
                gridGap: {
                  _: "20px",
                  md: "40px",
                  xxl: "56px",
                },
                flexDirection: {
                  _: "row",
                },
              }}
            />
            <Typography
              display={{
                _: "none",
                md: "inherit",
              }}
              m="0"
              color="offWhite"
              as="caption"
            >
              {copyright}
            </Typography>
          </AboutUs>
          {widgets.map((item) => (
            <FooterWidget
              key={item.id}
              display={{
                _: "none",
                md: "flex",
              }}
            >
              <Typography
                mt="0"
                mb={{
                  _: "12px",
                  md: "24px",
                  lg: "26px",
                  xxl: "28px",
                }}
                color="offWhite"
                as="subtitle1"
                style={{
                  WebkitTextStroke: "1px #707070",
                }}
              >
                {item.title}
              </Typography>
              <ul>
                {item.list.map((item) => (
                  <FooterWidgetItem
                    key={item.id}
                    mb={{
                      _: "12px",
                      md: "16px",
                      lg: "20px",
                      xxl: "24px",
                    }}
                  >
                    <NextLink href={item.link} shallow>
                      <Button
                        title={item.title}
                        variant="text"
                        colors="nav"
                        as="a"
                        target={item.target}
                        href={item.link}
                      />
                    </NextLink>
                  </FooterWidgetItem>
                ))}
              </ul>
            </FooterWidget>
          ))}
          <ContactInfo
            alignItems={{
              _: "center",
              md: "flex-start",
            }}
          >
            <Typography
              mt={{
                _: "30px",
                md: "0",
              }}
              mb={{
                _: "12px",
                md: "24px",
                lg: "26px",
                xxl: "28px",
              }}
              color="offWhite"
              as="subtitle1"
              style={{
                WebkitTextStroke: "1px #707070",
              }}
            >
              Stay in touch
            </Typography>
            <MailchimpSubscribe
              url={mailchimpUrl}
              render={(props) => {
                const { subscribe, status, message } = props || {};
                return (
                  <NewsletterForm
                    status={status}
                    message={message}
                    onValidated={(formData) => subscribe(formData)}
                  />
                );
              }}
            />
          </ContactInfo>

          <SocialWrapper
            socialStyles={{
              display: {
                _: "inherit",
                md: "none",
                lg: "inherit",
              },
              mt: {
                _: "75px",
                md: "0px",
              },
              justifyContent: "center",
            }}
            socialLinksStyles={{
              gridGap: {
                _: "20px",
                md: "40px",
                xxl: "56px",
              },
              alignItems: "center",
              flexDirection: {
                _: "row",
                lg: "column",
              },
            }}
          />
          <Typography
            display={{
              _: "inherit",
              md: "none",
            }}
            mt="40px"
            color="offWhite"
            as="caption"
            textAlign="center"
          >
            {copyright}
          </Typography>
        </Grid>
      </Container>
    </FooterSection>
  );
};

export default Footer;
