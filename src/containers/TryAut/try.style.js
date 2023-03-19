import { themeGet } from "@styled-system/theme-get";
import { base } from "common/components/base";
import styled from "styled-components";

export const BubbleImageWrapper = styled("div")`
  position: relative;
  margin: 0 auto;

  .inner-content {
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;


    img {
      width: 100%;
    }

    .aut-card-flip {
      display: flex;
      position: absolute;
      border-radius: 50%;
    }

    .aut-card-container.back {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  ${themeGet("mediaQueries.md")} {
    width: 300px;
    height: 300px;
    .inner-content {
      width: 480px;
      height: 480px;

      .aut-card-flip {
        width: 347px;
        height: 347px;
      }

      .aut-card-container.front {
        padding-top: 40px;
      }
    }
  }

  ${themeGet("mediaQueries.xs")} {
    width: 300px;
    height: 300px;
    .inner-content {
      width: 480px;
      height: 480px;

      .aut-card-flip {
        width: 347px;
        height: 347px;
      }

      .aut-card-container.front {
        padding-top: 85px;
      }
    }
  }

  ${themeGet("mediaQueries.sm")} {
    width: 350px;
    height: 350px;
    .inner-content {
      width: 550px;
      height: 550px;

      .aut-card-flip {
        width: 347px;
        height: 347px;
      }

      .aut-card-container.front {
        padding-top: 60px;
      }
    }
  }

  ${themeGet("mediaQueries.lg")} {
    width: 350px;
    height: 350px;
    .inner-content {
      width: 550px;
      height: 550px;

      .aut-card-flip {
        width: 347px;
        height: 347px;
      }

      .aut-card-container.front {
        padding-top: 70px;
      }
    }
  }

  ${themeGet("mediaQueries.xxl")} {
    width: 620px;
    height: 620px;
    .inner-content {
      width: 800px;
      height: 800px;

      .aut-card-flip {
        width: 506px;
        height: 506px;
      }

      .aut-card-container.front {
        padding-top: 100px;
      }
    }
  }
  ${base}
`;

export const BlackHoleWrapper = styled("div")`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;

  &:not(.complete):not(.current) {
    opacity: 0.5;
  }
  ${base}
`;

export const Grid = styled("div")`
  ${themeGet("mediaQueries.xs")} {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 170px;
  }

  ${themeGet("mediaQueries.md")} {
    display: grid;
    grid-gap: 0;
    grid-template-areas: "first second third";
    grid-template-columns: repeat(3, 1fr);
  }

  ${themeGet("mediaQueries.lg")} {
    grid-gap: 40px;
  }
`;
