import axios from "axios";

export const getAppConfig = () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/autid/config/network/testing`)
    .then((r) => r.data);
};