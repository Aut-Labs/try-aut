import axios from "axios";

export const AUTH_TOKEN_KEY = "user-access-token";

export const authoriseWithWeb3 = async (provider) => {
  try {
    const [account] = await provider.request({
      method: "eth_requestAccounts",
    });

    const responseNonce = await axios.get(
      `https://api.skillwallet.id/api/autID/user/nonce/${account}`
    );

    const nonce = responseNonce.data.nonce;

    const signature = await provider.request({
      method: "personal_sign",
      params: [nonce, account],
    });

    const jwtResponse = await axios.post(
      `https://api.skillwallet.id/api/autID/user/getToken`,
      {
        address: account,
        signature,
      }
    );
    localStorage.setItem(AUTH_TOKEN_KEY, jwtResponse.data.token);
    const isAuthorised = !!jwtResponse.data.token;
    return isAuthorised;
  } catch (error) {
    return false;
  }
};
