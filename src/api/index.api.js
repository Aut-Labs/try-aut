import axios from "axios";

export const getAppConfig = () => {
  return axios
    .get(`https://dev-api.aut.id/api/autid/config/network/testing`)
    .then((r) => r.data);
};