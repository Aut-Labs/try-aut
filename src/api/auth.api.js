import { Web3AllowlistProvider } from "@aut-labs-private/abi-types";
import axios from "axios";

export const AUTH_TOKEN_KEY = "user-access-token";

export const authoriseWithWeb3 = async (signer) => {
  try {
    const account = await signer.getAddress();

    const responseNonce = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/autID/user/nonce/${account}`
    );

    const nonce = responseNonce.data.nonce;

    const signature = await signer.signMessage(`${nonce}`);

    const jwtResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/autID/user/getToken`,
      {
        address: account,
        signature,
      }
    );
    localStorage.setItem(AUTH_TOKEN_KEY, jwtResponse.data.token);
    const isAuthorised = !!jwtResponse.data.token;
    return isAuthorised;
  } catch (error) {
    throw error;
  }
};

export const isAllowListed = async (signer, allowListAddress) => {
  try {
    const account = await signer.getAddress();
    const contract = Web3AllowlistProvider(allowListAddress, {
      signer: () => signer,
    });
    const isAllowed = await contract.isAllowed(account);
    if (!isAllowed) {
      throw new Error(
        "Aw shucks, it looks like you’re not on the Allowlist for this round."
      );
    }
    return isAllowed;
  } catch (error) {
    throw new Error(
      "Aw shucks, it looks like you’re not on the Allowlist for this round."
    );
  }
};
