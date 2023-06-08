export const trimAddress = (address) => {
  if (!address) {
    return "";
  }
  const middle = Math.ceil(address.length / 2);
  const left = address.slice(0, middle).substring(0, 6);
  let right = address.slice(middle);
  right = right.substr(right.length - 4);
  return `${left}...${right}`.toUpperCase();
};

export const toHex = (num) => {
  const val = Number(num);
  return `0x${val.toString(16)}`;
};

export const autUrls = () => {
  if (process.env.NODE_ENV === "development") {
    return {
      tryAut: "https://try-internal.aut.id/",
      novaDashboard: "https://nova-internal.aut.id/",
      myAut: "https://my-internal.aut.id/",
      showcase: "https://showcase-internal.aut.id/",
      leaderboard: "https://leaderboard-internal.aut.id/",
      expander: "https://expander-internal.aut.id/",
    };
  }

  return {
    tryAut: "https://try.aut.id/",
    novaDashboard: "https://nova.aut.id/",
    myAut: "https://my.aut.id/",
    showcase: "https://showcase.aut.id/",
    leaderboard: "https://leaderboard.aut.id/",
    expander: "https://expander.aut.id/",
  };
};
