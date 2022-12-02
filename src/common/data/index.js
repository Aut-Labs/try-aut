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
          id: 1,
          title: "About Aut",
          link: "/about",
        },
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
        {
          id: 4,
          title: "Product Suite",
          link: "/products",
        },
        // {
        //   id: 2,
        //   title: "Manifesto",
        //   link: "/manifesto",
        // },
        // {
        //   id: 4,
        //   title: "Ask Āut",
        //   link: "/qa",
        // },
        // {
        //   id: 5,
        //   title: "RoadMap",
        //   link: "/roadmap",
        // },
      ],
    },
    // {
    //   id: 3,
    //   title: "Āut Products",
    //   list: [
    //     {
    //       id: 1,
    //       title: "Āut Expander",
    //       target:"_blank",
    //       link: "https://docs.aut.id/v2/product-suite/aut-exp.",
    //     },
    //     {
    //       id: 2,
    //       title: "dĀut",
    //       target:"_blank",
    //       link: "https://docs.aut.id/v2/product-suite/daut",
    //     },
    //     {
    //       id: 3,
    //       title: "Āut ID",
    //       target:"_blank",
    //       link: "https://docs.aut.id/v2/product-suite/my-autid",
    //     },
    //     // {
    //     //   id: 4,
    //     //   title: "Dashboard",
    //     //   link: "/products/aut-dashboard",
    //     // },
    //   ],
    // },
  ],
  compactWidgets: [
    {
      id: 2,
      title: "Quick Links",
      list: [
        {
          id: 1,
          title: "About Aut",
          link: "/about",
        },
        {
          id: 2,
          title: "Docs",
          target: "_blank",
          link: "https://docs.aut.id",
        },
        {
          id: 3,
          title: "Product Suite",
          link: "/products",
        },
      ],
    },
  ],
  social: [
    {
      link: "https://docs.aut.id",
      icon: footerDocs,
      name: "Docs",
    },
    {
      link: "https://twitter.com/opt_aut",
      icon: footerTwitter,
      name: "Twitter",
    },
    {
      link: "http://discord.gg/aXJFGgcvUk",
      icon: footerDiscord,
      name: "Discord",
    },
    // {
    //   link: "https://blog.skillwallet.id",
    //   icon: footerMedium,
    // },
  ],
};

/* ------------------------------------ */
// TRY-AUT data section
/* ------------------------------------ */
import expand from "common/assets/image/expand.svg";
import invite from "common/assets/image/invite.svg";
import fingerprint from "common/assets/image/fingerprint.svg";
import Button from "common/components/Button";

export const TryOutData = {
  title: "Try Āut",
  subtitle: "Join the Coordination Renaissance - and expand your DAO.",

  items: [
    {
      title: "Step 1",
      subtitle: "Expand your DAO",
      icon: expand.src,
      descriptions: [
        "Give superpowers to your community with native Roles 👥 & role-based membership directly at contract level ✍.",
        "Once expanded, your DAO will know magic things such as Roles, Interactions & Commitment.",
      ],
      button: {
        text: "Try it",
        link: "https://playground.aut.id",
      },
    },
    {
      title: "Step 2",
      subtitle: "Invite your Members",
      icon: invite.src,
      descriptions: [
        "Think of dĀut as Google-Auth, just decentralized - as a bond between DAO & Members ⛓",
        `Your invitees will create an account, pick a Role, and claim their ĀutID ✍ 
        Then they’ll always have a bond with your magic DAO. After all, it was their first ✨`,
      ],
      button: {
        text: "Try it",
        link: "https://playground.aut.id",
      },
    },
    {
      title: "Step 3",
      subtitle: "Customize your ĀutID",
      icon: fingerprint.src,
      descriptions: [
        "ĀutID is the first Identity you can truly own. It’s a non-transferable NFT, and a portable account to login in all your DAOs. ",
        `You may say it’s the first Social Network for DAO Contributors - and it keeps track of all DAOs, Roles, and Commitments you choose.`,
        <>
          Join your first DAO & claim your ĀutID - you’ll get a page that looks{" "}
          <Button
            color="offWhite"
            style={{
              fontWeight: "bold",
              textTransform: "inherit",
            }}
            as="a"
            target="_blank"
            href="https://my.aut.id/"
            variant="link"
            title="like this[link]"
          />{" "}
          😎
        </>,
      ],
      button: {
        text: "Try it",
        link: "https://my.aut.id/",
      },
    },
  ],
};
