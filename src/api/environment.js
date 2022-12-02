
export const swEnvVariables = {
  networks: process.env.NEXT_PUBLIC_NETWORKS,
  networkNames: process.env.NEXT_PUBLIC_NETWORK_NAMES,
  rpcUrls: process.env.NEXT_PUBLIC_RPC_URLS,
  chainIds: process.env.NEXT_PUBLIC_CHAIN_IDS,
  blockExplorerUrls: process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URLS,
  autIDAddresses: process.env.NEXT_PUBLIC_AUT_ID_ADDRESSES,
  manifestoAddresses: process.env.NEXT_PUBLIC_MANIFESTO_ADDRESSES,
  manifestApi: process.env.NEXT_PUBLIC_MANIFEST_API_URL,
};

export const environment = swEnvVariables;

export const getNetworkVariables = (name) => {
  const index = environment.networks.split(',').findIndex((r) => r.trim().toLowerCase() === name.trim().toLowerCase());
  const autIdAddress = environment.autIDAddresses.split(',')[index];
  const manifestoAddress = environment.manifestoAddresses.split(',')[index];
  const rpcUrls = environment.rpcUrls.split(',')[index].split('|');
  const blockExplorerUrls = environment.blockExplorerUrls.split(',')[index].split('|');
  const chainId = environment.chainIds.split(',')[index];

  return {
    autIdAddress,
    manifestoAddress,
    network: {
      name,
      rpcUrls,
      chainId: Number(chainId),
      blockExplorerUrls,
    },
  };
};
