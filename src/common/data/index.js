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

function getOwnerPhases() {
  const phaseOneStartDate = new Date("2023-05-16T07:00:00.000Z");
  // set the time zone to CET
  phaseOneStartDate.setUTCHours(7);
  phaseOneStartDate.setMinutes(0);
  phaseOneStartDate.setSeconds(0);
  phaseOneStartDate.setMilliseconds(0);

  const phaseOneDuration = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  const phaseTwoDuration = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  const phaseThreeDuration = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

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

function getMemberPhases() {
  const { phaseThreeEndDate: ownerPhaseThreeEndDate } = getOwnerPhases();

  const phaseOneDuration = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  const phaseTwoDuration = 9 * 60 * 60 * 1000; // 9 hours in milliseconds
  const phaseThreeDuration = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

  const phaseOneStartDate = new Date(ownerPhaseThreeEndDate.getTime());
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

function ownerTimeLocks() {
  const {
    phaseOneStartDate,
    phaseOneEndDate,
    phaseTwoStartDate,
    phaseTwoEndDate,
    phaseThreeStartDate,
    phaseThreeEndDate,
  } = getOwnerPhases();

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

function memberTimeLocks() {
  const {
    phaseOneStartDate,
    phaseOneEndDate,
    phaseTwoStartDate,
    phaseTwoEndDate,
    phaseThreeStartDate,
    phaseThreeEndDate,
  } = getMemberPhases();

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

export const TryOutData = {
  title: "Try Āut",
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
        link: "https://playground.aut.id",
      },
      success: {
        icon: check.src,
        title: "Expand",
        subtitle: (
          <>
            Expand your <br /> DAO's capabilities <br /> with Āut protocol.
          </>
        ),
      },
      front: {
        showDao: true,
        title: "Expand",
        icon: expand.src,
        subtitle: (
          <>
            Expand your <br /> DAO's capabilities <br /> with Āut protocol.
          </>
        ),
      },
      back: {
        description:
          "With Āut protocol, you can expand your DAO's capabilities add roles and streamline your community management on the dashboard",
      },
      complete: false,
    },
    {
      button: {
        type: "webcomponent",
        link: "https://dashboard-internal-test.aut.id",
        cacheParams: ["daoAddress"],
      },
      success: {
        icon: check.src,
        title: "Claim ĀutID",
        subtitle: (
          <>
            Claim ĀutID and <br /> explore the dashboard
          </>
        ),
      },
      front: {
        title: "Claim ĀutID",
        icon: fingerprint.src,
        subtitle: (
          <>
            Claim ĀutID and <br /> explore the dashboard
          </>
        ),
      },
      back: {
        description:
          "By claiming you unique ĀutID you will unlock the dashboard where you can explore your DAO members and their roles, quests & tasks and much more",
      },
      complete: false,
    },
    {
      button: {
        type: "link",
        link: "https://dashboard-internal-test.aut.id",
        cacheParams: ["daoAddress"],
      },
      success: {
        icon: check.src,
        title: "Setup Dashboard",
        subtitle: (
          <>
            Set up your <br /> dashboard to manage <br /> quests and tasks.
          </>
        ),
      },
      front: {
        title: "Setup Dashboard",
        icon: setup.src,
        subtitle: (
          <>
            Set up your <br /> dashboard to manage <br /> quests and tasks.
          </>
        ),
      },
      back: {
        description:
          "Create and manage quest for each community role, and create tasks for for each quest for members to complete their onboarding",
      },
      complete: false,
    },
  ],
  memberItems: [
    {
      button: {
        type: "link",
        link: "http://176.34.149.248:4002",
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
        icon: invite.src,
        subtitle: (
          <>
            Apply for a quest to <br /> accept the invitation <br /> from your
            DAO.
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
        link: "https://dashboard-internal-test.aut.id/quest",
        cacheParams: ["daoAddress", "onboardingQuestAddress", "questId"],
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
        title: "Onboard",
        icon: invite.src,
        subtitle: (
          <>
            Complete all tasks to <br /> complete onboarding quest
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
        link: "https://my.aut.id/",
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
        title: "Claim ĀutID",
        icon: fingerprint.src,

        subtitle: (
          <>
            Claim ĀutID and <br /> explore the dashboard
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
