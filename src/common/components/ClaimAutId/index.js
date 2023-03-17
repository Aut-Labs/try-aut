import {
  createContext,
  memo,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getCache, updateCache } from "api/cache.api";

export const AutIDContext = createContext({});

const initialState = {
  daoAddress: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DAO_ADDRESS":
      return {
        ...state,
        daoAddress: action.payload,
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
  const [initWebcomponent, setInitWebcomponent] = useState(false);

  useEffect(() => {
    if (!initWebcomponent) {
      setInitWebcomponent(true);
      const onAutMinted = async () => {
        try {
          const cache = await getCache("UserPhases");
          cache.list[1].status = 1;
          await updateCache(cache);
        } catch (error) {
          console.log(error);
        }
      };
      window.addEventListener("aut-minted", onAutMinted);
      const init = async () => {
        // const dautEl = document.getElementById("daut-container");
        const dAut = await import("@aut-labs/d-aut");
        dAut.Init();
      };
      init();
    }
    return () => {
      // window.removeEventListener("aut-minted", onAutMinted);
    };
  }, [initWebcomponent]);

  return (
    <d-aut
      style={{
        position: "absolute",
      }}
      dao-expander={value?.state?.daoAddress}
      id="d-aut"
      ipfs-gateway="https://ipfs.nftstorage.link/ipfs"
      button-type="simple"
    />
  );
};

export default memo(ClaimAutId);
