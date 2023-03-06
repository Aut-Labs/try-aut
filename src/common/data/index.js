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
import footerDocs from "common/assets/image/docs.svg";
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
import check from "common/assets/image/check.svg";

export const TryOutData = {
  title: "Try Āut",
  mainSubtitle: "Join the Coordination Renaissance",
  ownerSubtitle: "Join the Coordination Renaissance - and expand your DAO.",
  memberSubtitle: "Join the Coordination Renaissance - and participate in a DAO.",
  ownerItems: [
    {
      button: {
        link: "https://playground.aut.id",
      },
      success: {
        icon: check.src,
        title: "Expanded",
        subtitle: (
          <>
            Your DAO was expanded
          </>
        ),
      },
      front: {
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
        link: "http://176.34.149.248:3333",
        cacheParams: ["daoAddress"],
      },
      success: {
        icon: check.src,
        title: "Setup Complete",
        subtitle: (
          <>
            Your Āut Dashboard <br /> is ready
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
    {
      button: {
        link: "https://my.aut.id/",
      },
      success: {
        icon: check.src,
        title: "Invited",
        subtitle: (
          <>
            Invitation was sent
          </>
        ),
      },
      front: {
        title: "Send Invites",
        icon: invite.src,
        subtitle: (
          <>
            Invite members to <br /> join and participate <br /> in a quest
          </>
        ),
      },
      back: {
        description:
          "Invite members to join your DAO, and to complete onboarding quest.",
      },
      complete: false,
    },
  ],
  memberItems: [
    {
      button: {
        link: "https://showcase.aut.id",
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
            Apply for a quest to <br />  accept the invitation <br /> from your DAO.
          </>
        ),
      },
      back: {
        description:
          "Click on the Start to access Nova Showcase, where you can explore all the available DAOs and choose to apply for any quest of a given DAO.",
      },
      complete: false,
    },
    {
      button: {
        link: "http://localhost:3001/quest",
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
