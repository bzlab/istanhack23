import { BrowserProvider, Contract } from "ethers";

import contractData from "./inshrance.json";

const contractAddress = "0xF67d7E575c4408497D0171A4c7E6Ca526d31119E";
const provider = new BrowserProvider(window.ethereum);

const signer = await provider.getSigner();
const signerContract = new Contract(contractAddress, contractData.abi, signer);

console.log(signerContract);


export const getSignerContract = (): Contract => {
  return signerContract;
};
