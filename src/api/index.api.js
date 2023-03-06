import axios from "axios";

export const getAppConfig = () => {
  return axios
    .get(`https://api.skillwallet.id/api/autid/config/network/testing`)
    .then((r) => r.data);
};

export const getCache = async (userAddress) => {
  const res = await axios.get(
    `https://api.skillwallet.id/api/autid/cache/getCache/${userAddress}`
  );
  return res?.data || null;
};