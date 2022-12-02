import { themeGet } from "@styled-system/theme-get";
import { base } from "common/components/base";
import styled from "styled-components";

export const BubbleImageWrapper = styled("div")`
  position: relative;
  margin: 0 auto;
  width: 300px;
  height: 300px;
  figure {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    width: 500px;
    height: 500px;
  }

  @media screen and (min-width: 420px) {
    width: 380px;
    height: 380px;
    figure {
      width: 580px;
      height: 580px;
    }
  }

  ${themeGet("mediaQueries.sm")} {
    width: 450px;
    height: 450px;
    figure {
      width: 700px;
      height: 700px;
    }
  }

  ${themeGet("mediaQueries.lg")} {
    width: 500px;
    height: 500px;
    figure {
      width: 730px;
      height: 730px;
    }
  }

  ${themeGet("mediaQueries.xxl")} {
    width: 620px;
    height: 620px;
    figure {
      width: 800px;
      height: 800px;
    }
  }
  ${base}
`;

export const BlackHoleWrapper = styled("div")`
  flex: 1;
  position: relative;
  .content {
    transform: translateX(-50%);
    left: 50%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ${base}
`;

export const Grid = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 80px;

  .content {
    top: -8px;
    width: 315px;
    height: 315px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 30px;
  }

  @media screen and (min-width: 420px) {
    .content {
      top: 8px;
      width: 365px;
      height: 365px;
    }
  }

  ${themeGet("mediaQueries.sm")} {
    .content {
      top: 8px;
      width: 445px;
      height: 445px;
      padding: 50px;
    }
  }

  ${themeGet("mediaQueries.md")} {
    .content {
      width: 460px;
      height: 460px;
      padding: 60px;
    }

    grid-template-areas:
      "first first first first"
      "second second third third";
    grid-template-columns: 1fr 1fr 1fr 1fr;

    .item-1 {
      grid-area: first;
    }

    .item-2 {
      grid-area: second;
    }

    .item-3 {
      grid-area: third;
    }
  }

  ${themeGet("mediaQueries.lg")} {
    grid-gap: 40px;
  }

  ${themeGet("mediaQueries.xxl")} {
    grid-gap: 0;
    .content {
      top: 55px;
      width: 505px;
      height: 505px;
      padding: 50px;
    }

    .item-2 {
      margin-top: 100px;
    }

    grid-template-areas: "first second third";
    grid-template-columns: repeat(3, 1fr);
  }
`;
