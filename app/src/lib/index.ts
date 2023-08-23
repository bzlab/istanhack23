import { ethers } from "ethers";

import { formatDID, verifyCredential, getCredential } from "./did";

const rpcUrl = "https://rpc.eth.testedge2.haqq.network";

export const provider = new ethers.JsonRpcProvider(rpcUrl);

const currentAccountKey = "currentAccount";

const persistCurrentAccount = (account: string) => {
  console.log(`persisting account ${account}`);
  window.localStorage.setItem(currentAccountKey, account);
};

const getCurrenctAccount = (): string => {
  const c = window.localStorage.getItem(currentAccountKey)!;
  console.log(`getting currenctAccount ${c}`);
  return c;
};

const weiToEther = (wei: string): string => {
  return ethers.formatEther(wei).slice(0, 4);
};

export {
  persistCurrentAccount,
  getCurrenctAccount,
  weiToEther,
  formatDID,
  verifyCredential,
  getCredential,
};
