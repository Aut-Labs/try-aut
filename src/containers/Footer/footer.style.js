import { themeGet } from "@styled-system/theme-get";
import { base } from "common/components/base";
import Section from "common/components/Section";
import styled from "styled-components";
import {
  alignItems,
  display,
  flexDirection,
  gridGap,
  gridTemplateColumns,
  justifyContent,
} from "styled-system";
import BubbleImage from "common/assets/image/bubble.svg";

export const FooterSection = styled(Section)`
  position: relative;
  margin-top: 100px;
  width: 100%;
  overflow: hidden;
  ${themeGet("mediaQueries.md")} {
    &:before {
      content: " ";
      display: block;
      position: absolute;
      filter: blur(50px);
      -webkit-filter: blur(50px);
      transform: rotate(-57deg);
      z-index: -1;
      bottom: -750px;
      left: -100px;
      width: 1000px;
      height: 1000px;
      background-image: url(${BubbleImage.src});
    }
  }
`;

export const Grid = styled("div")`
  display: grid;
  border-top: 2px solid ${themeGet("color.offWhite")};
  ${base}
  ${gridTemplateColumns}
`;

export const AboutUs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${alignItems}
`;

export const FooterWidgetItem = styled("li")`
  &:last-child {
    margin-bottom: 0;
  }
  a {
    text-transform: inherit;
    color: ${themeGet("colors.textColor")};
    &:hover {
      color: ${themeGet("colors.white")};
    }
  }
  ${base};
`;

export const FooterWidget = styled.div`
  display: flex;
  flex-direction: column;
  &:last-child {
    margin-right: 0;
  }
  ${display}
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  ${alignItems}
`;

export const Social = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 30%;

  ${base}
  ${alignItems}
  ${justifyContent}
`;

export const SocialLinks = styled("div")`
  display: flex;
  align-items: center;

  ${base}
  ${gridGap}
  ${flexDirection}
`;
