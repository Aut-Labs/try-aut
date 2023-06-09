import axios from "axios";
import { AUTH_TOKEN_KEY } from "./auth.api";

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[]\]/g, "$&"); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

function ipfsCIDToHttpUrl(url, nftStorageUrl) {
  if (!url) {
    return url;
  }
  if (!url.includes("https://"))
    return `${nftStorageUrl}/${replaceAll(url, "ipfs://", "")}`;
  return url;
}

export const getCache = async (cacheKey) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/autID/cache/getCache/${cacheKey}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res?.data || null;
};

const testData = {
  data: {
    name: "Beans",
    description:
      "ĀutID are a new standard for self-sovereign Identities that do not depend from the provider,\n       therefore, they are universal. They are individual NFT IDs.",
    properties: {
      avatar:
        "ipfs://bafkreifvbdnaj2badpncg2pedx4lw3hxvfiuj3mn3ok5solmwhwxij5kdy",
      timestamp: "13:33:48 | 09/06/23",
    },
    image:
      "ipfs://bafybeignoree7vfbx6c7saivzmrm22r6oldg4roj3oevvc2um4754hfp6i/AutID.png",
  },
  expiry: 1686338205384,
};

export const getUser = async (userAddress) => {
  if (!userAddress) {
    return null;
  }
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/autID/${userAddress}?network=mumbai`
    );
    const { metadataUri } = res.data;
    const profile = await axios.get(ipfsCIDToHttpUrl(metadataUri));
    return {
      address: userAddress,
      ...(profile?.data || {}),
    };
  } catch (error) {
    return {
      address: userAddress,
      name: null,
    };
  }
};

export const updateCache = async (cache) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/autID/cache/addOrUpdateCache/${cache.cacheKey}`,
    cache,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res?.data || null;
};

export const deleteCache = async (cacheKey) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/autID/cache/deleteCache/${cacheKey}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res?.data || null;
};
