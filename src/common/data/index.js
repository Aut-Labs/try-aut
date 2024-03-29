/* eslint-disable react/no-unescaped-entities */
import AutLogo from "common/assets/image/logo.svg";

/* ------------------------------------ */
// Navbar data section
/* ------------------------------------ */

export const NavbarData = {
  logo: AutLogo,
  navButtons: [],
  menuItems: [],
};

/* ------------------------------------ */
// FOOTER data section
/* ------------------------------------ */
import footerDiscord from "common/assets/image/discord-social.svg";
import footerTwitter from "common/assets/image/twitter-social.svg";
import footerMirror from "common/assets/image/mirror-logo.svg";

export const FooterData = {
  menu: [],
  logo: AutLogo,
  mailchimpUrl:
    "https://aut.us20.list-manage.com/subscribe/post?u=d961a0504e2d77cc544c89c33&amp;id=0599e9c37b&amp;f_id=008810e7f0",
  copyright: `© Āut Labs ${new Date().getFullYear()}`,
  widgets: [
    {
      id: 2,
      title: "Quick Links",
      list: [
        {
          id: 3,
          title: "Github",
          target: "_blank",
          link: "https://github.com/Aut-Labs",
        },
        {
          id: 2,
          title: "Docs",
          target: "_blank",
          link: "https://docs.aut.id",
        },
      ],
    },
  ],
  social: [
    {
      link: "https://twitter.com/opt_aut",
      icon: footerTwitter,
      name: "Twitter",
    },
    {
      link: "https://aut.mirror.xyz",
      icon: footerMirror,
      name: "Mirror",
    },
    {
      link: "http://discord.gg/aXJFGgcvUk",
      icon: footerDiscord,
      name: "Discord",
    },
  ],
};

/* ------------------------------------ */
// TRY-AUT data section
/* ------------------------------------ */
import expand from "common/assets/image/expand.svg";
import invite from "common/assets/image/invite.svg";
import fingerprint from "common/assets/image/fingerprint.svg";
import setup from "common/assets/image/setup.svg";
import check from "common/assets/image/check-all.png";
import joinIcon from "common/assets/image/contributor-join-1.svg";
import participateIcon from "common/assets/image/contributor-participate-2.svg";
import claimIcon from "common/assets/image/contributor-claim-3.svg";

import { autUrls } from "common/utils/misc";

function getOwnerPhases(startDate) {
  const phaseOneStartDate = startDate;

  const phaseOneDuration = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
  const phaseTwoDuration = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
  const phaseThreeDuration = 72 * 60 * 60 * 1000; // 72 hours in milliseconds

  const phaseOneEndDate = new Date(
    phaseOneStartDate.getTime() + phaseOneDuration
  );
  const phaseTwoStartDate = new Date(phaseOneEndDate.getTime());
  const phaseTwoEndDate = new Date(
    phaseTwoStartDate.getTime() + phaseTwoDuration
  );
  const phaseThreeStartDate = new Date(phaseTwoEndDate.getTime());
  const phaseThreeEndDate = new Date(
    phaseThreeStartDate.getTime() + phaseThreeDuration
  );

  return {
    phaseOneDuration,
    phaseTwoDuration,
    phaseThreeDuration,
    phaseOneStartDate,
    phaseOneEndDate,
    phaseTwoStartDate,
    phaseTwoEndDate,
    phaseThreeStartDate,
    phaseThreeEndDate,
  };
}

function getMemberPhases(startDate, endDate) {
  
  const phaseOneDuration = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
  const phaseOneStartDate = new Date(startDate.getTime() - phaseOneDuration);
  
  const phaseTwoDuration = endDate.getTime() - startDate.getTime();
  
  const phaseThreeDuration = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

  const phaseOneEndDate = new Date(startDate.getTime());
  const phaseTwoStartDate = new Date(startDate.getTime());
  const phaseTwoEndDate = new Date(endDate.getTime());
  const phaseThreeStartDate = new Date(endDate.getTime());
  const phaseThreeEndDate = new Date(
    phaseThreeStartDate.getTime() + phaseThreeDuration
  );

  return {
    phaseOneDuration,
    phaseTwoDuration,
    phaseThreeDuration,
    phaseOneStartDate,
    phaseOneEndDate,
    phaseTwoStartDate,
    phaseTwoEndDate,
    phaseThreeStartDate,
    phaseThreeEndDate,
  };
}

function ownerTimeLocks(startDate) {
  const {
    phaseOneStartDate,
    phaseOneEndDate,
    phaseTwoStartDate,
    phaseTwoEndDate,
    phaseThreeStartDate,
    phaseThreeEndDate,
  } = getOwnerPhases(startDate);

  const currentDate = new Date(); // Get current date and time

  if (currentDate >= phaseOneStartDate && currentDate < phaseOneEndDate) {
    return {
      phase: 1,
      startDate: phaseOneStartDate.getTime(),
      endDate: phaseOneEndDate.getTime(),
    };
  } else if (
    currentDate >= phaseTwoStartDate &&
    currentDate < phaseTwoEndDate
  ) {
    return {
      phase: 2,
      startDate: phaseTwoStartDate.getTime(),
      endDate: phaseTwoEndDate.getTime(),
    };
  } else if (
    currentDate >= phaseThreeStartDate &&
    currentDate < phaseThreeEndDate
  ) {
    return {
      phase: 3,
      startDate: phaseThreeStartDate.getTime(),
      endDate: phaseThreeEndDate.getTime(),
    };
  } else if (currentDate < phaseOneStartDate) {
    console.log("The time lock has not started yet.");
    return {
      phase: 0,
      startDate: currentDate,
      endDate: phaseOneStartDate,
    };
  } else {
    console.log("The time lock has ended");
    return {
      phase: -1,
      startDate: currentDate,
      endDate: currentDate,
    };
  }
}

function memberTimeLocks(startDate, endDate, hasStarted = false) {
  if (!hasStarted) {
    const phaseOneDuration = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
    return {
      phase: 1,
      startDate: new Date(),
      endDate: new Date(new Date() + phaseOneDuration),
    };
  }
  const {
    phaseOneStartDate,
    phaseOneEndDate,
    phaseTwoStartDate,
    phaseTwoEndDate,
    phaseThreeStartDate,
    phaseThreeEndDate,
  } = getMemberPhases(startDate, endDate);

  const currentDate = new Date(); // Get current date and time

  if (currentDate >= phaseOneStartDate && currentDate < phaseOneEndDate) {
    return {
      phase: 1,
      startDate: phaseOneStartDate.getTime(),
      endDate: phaseOneEndDate.getTime(),
    };
  } else if (
    currentDate >= phaseTwoStartDate &&
    currentDate < phaseTwoEndDate
  ) {
    return {
      phase: 2,
      startDate: phaseTwoStartDate.getTime(),
      endDate: phaseTwoEndDate.getTime(),
    };
  } else if (
    currentDate >= phaseThreeStartDate &&
    currentDate < phaseThreeEndDate
  ) {
    return {
      phase: 3,
      startDate: phaseThreeStartDate.getTime(),
      endDate: phaseThreeEndDate.getTime(),
    };
  } else if (currentDate < phaseOneStartDate) {
    console.log("The time lock has not started yet.");
    return {
      phase: 0,
      startDate: currentDate,
      endDate: phaseOneStartDate,
    };
  } else {
    console.log("The time lock has ended");
    return {
      phase: -1,
      startDate: currentDate,
      endDate: currentDate,
    };
  }
}

const urls = autUrls();

export const TryOutData = {
  // title: "Try Āut",
  memberTitle: "Try Āut - Contributor",
  ownerTitle: "Try Āut - Operator",
  mainSubtitle: "Join the Coordination Renaissance",
  ownerSubtitle: "Join the Coordination Renaissance - and expand your DAO.",
  ownerTimeLocks,
  memberTimeLocks,
  memberSubtitle:
    "Join the Coordination Renaissance - and participate in a DAO.",
  ownerItems: [
    {
      button: {
        type: "link",
        link: urls.expander,
      },
      success: {
        icon: check.src,
        title: "Expand",
        subtitle: <>You launched your Nova.</>,
      },
      front: {
        showDao: true,
        title: "Expand",
        icon: expand.src,
        subtitle: (
          <>
            Launch your Nova, add <br />
            Member’s Roles & Interaction <br /> to your DAO.
            <br />
            And Coordinate!
          </>
        ),
      },
      back: {
        description:
          "Nova is a standard that expands the concept of DAO, bringing Members’ Roles & Interactions at Contract level.",
      },
      stayUnlockedUntilPhase: 2,
      disabledTimeLock: true,
      complete: false,
    },
    {
      button: {
        type: "webcomponent",
        link: urls.novaDashboard,
        cacheParams: ["daoAddress"],
      },
      success: {
        icon: check.src,
        title: "Claim",
        subtitle: <>You claimed your ĀutID.</>,
      },
      front: {
        showMyAut: true,
        title: "Claim",
        icon: fingerprint.src,
        subtitle: (
          <>
            Take your rightful Role <br />
            & Commitment <br />
            in your brand-new Nova.
          </>
        ),
      },
      back: {
        description:
          "The ĀutID lets you claim a functional Role in your Nova. It’s also the 1st SBT that ties together Members & the Communities they’re part of to build sybil-resistent, portable reputation.",
      },
      // stayUnlockedUntilPhase: 3,
      disabledTimeLock: true,
      complete: false,
    },
    {
      button: {
        type: "link",
        link: urls.novaDashboard,
        cacheParams: ["daoAddress"],
      },
      success: {
        icon: check.src,
        title: "Onboard",
        subtitle: (
          <>
            Set up your <br /> dashboard to manage <br /> quests and tasks.
          </>
        ),
      },
      front: {
        title: "Onboard",
        icon: setup.src,
        subtitle: (
          <>
            Create & Launch an <br />
            Onboarding Quest for the <br />
            Roles in your Community!
          </>
        ),
      },
      back: {
        description:
          "The Dashboard is the Operating System of your Nova. Create Role-based Quests, add modules, and fully on-chain, scaled Operations for your community to coordinate and capture value.",
      },
      disabledTimeLock: true,
      complete: false,
    },
  ],
  memberItems: [
    {
      button: {
        type: "link",
        link: urls.showcase,
        queryParams: ["daoAddress"],
      },
      success: {
        icon: check.src,
        title: "Joined",
        subtitle: (
          <>
            You have applied <br /> for a DAO quest
          </>
        ),
      },
      front: {
        title: "Join",
        icon: joinIcon.src,
        subtitle: (
          <>
            Check the Nova Showcase <br />
            and choose the next-gen DAO <br /> you want to be part of.
          </>
        ),
      },
      back: {
        description:
          "Click on the Start to access Nova Showcase, where you can explore all the available DAOs and choose to apply for any quest of a given DAO.",
      },
      stayUnlockedUntilPhase: 2,
      complete: false,
    },
    {
      button: {
        type: "link",
        link: urls.showcase,
        cacheParams: ["daoAddress"],
      },
      success: {
        icon: check.src,
        title: "Onboarded",
        subtitle: (
          <>
            You have completed <br /> the onboarding quest
          </>
        ),
      },
      front: {
        title: "Participate",
        icon: participateIcon.src,
        subtitle: (
          <>
            Take a Quest, prove your value,
            <br />
            and gain your seat
            <br />
            in the Community.
          </>
        ),
      },
      back: {
        description:
          "Completion of onboarding quest grants access to the next phase and unlocking of the dashboard",
      },
      complete: false,
    },
    {
      button: {
        type: "webcomponent",
        link: urls.myAut,
      },
      success: {
        icon: check.src,
        title: "ĀutID Claimed",
        subtitle: (
          <>
            ĀutID has <br /> been claimed
          </>
        ),
      },
      front: {
        title: "Claim",
        icon: claimIcon.src,

        subtitle: (
          <>
            Claim your ĀutID: the universal, <br />
            non-transferable passport <br />
            to the DAO ecosystem.
          </>
        ),
      },
      back: {
        description:
          "By claiming you unique ĀutID you will unlock the dashboard where you can explore your DAO members and their roles, quests & tasks and much more",
      },
      complete: false,
    },
  ],
};
