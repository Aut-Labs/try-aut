import {
  createContext,
  memo,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getCache, updateCache } from "api/cache.api";
import { useAccount } from "wagmi";

export const AutIDContext = createContext({});

const initialState = {
  daoAddress: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DAO_ADDRESS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export const AutIDContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AutIDContext.Provider value={{ state, dispatch }}>
      {children}
    </AutIDContext.Provider>
  );
};

const ClaimAutId = () => {
  const value = useContext(AutIDContext);
  const { address } = useAccount();
  const [allowedRole, setAllowedRole] = useState("");
  const [initWebcomponent, setInitWebcomponent] = useState(false);

  useEffect(() => {
    if (Object.keys(value.state).includes("isOwner") && !initWebcomponent) {
      setInitWebcomponent(true);
      const init = async () => {
        const isMember = !value.state.isOwner;
        if (isMember) {
          const cache = await getCache("UserPhases", address);
          if (cache) {
            setAllowedRole(`${cache.questId}`);
          }
        }
        const biconomyRef = await import("@aut-labs/sdk-biconomy");
        const dAut = await import("@aut-labs/d-aut");
        dAut.Init({
          biconomy: biconomyRef.SDKBiconomyWrapper,
        });
      };
      init();
      const onAutMinted = async () => {
        try {
          const cache = await getCache("UserPhases", address);
          const isOwner = value.state.isOwner;
          cache.list[isOwner ? 1 : 2].status = 1;
          await updateCache(cache);
        } catch (error) {
          console.log(error);
        }
      };
      window.addEventListener("aut-minted", onAutMinted);
    }

    return () => {
      // window.removeEventListener("aut-minted", onAutMinted);
    };
  }, [initWebcomponent, value.state, address]);

  return (
    <d-aut
      style={{
        position: "absolute",
      }}
      flow-config='{"mode" : "tryAut", "customCongratsMessage": ""}'
      use-dev={
        process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "true" : "false"
      }
      allowed-role-id={allowedRole}
      dao-expander={value?.state?.daoAddress}
      id="d-aut"
      ipfs-gateway="https://ipfs.nftstorage.link/ipfs"
    />
  );
};

export default memo(ClaimAutId);
