import axios from "axios";
import { environment } from "./environment";

export const getAllSignees = () => {
  return axios
    .get(`${environment.manifestApi}/manifesto/signees?part=1`)
    .then(({ data }) => data?.signees || []);
};

export const verifyTweetRequest = (
  signerAddress,
  signature,
  tweetID,
  part = 1
) => {
  return axios.post(`${environment.manifestApi}/manifesto/sign`, {
    signerAddress,
    signature,
    tweetID,
    part,
  });
};
