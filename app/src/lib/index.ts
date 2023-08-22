import { ethers } from 'ethers'

const rpcUrl = 'https://rpc.eth.testedge2.haqq.network'

export const provider = new ethers.JsonRpcProvider(rpcUrl)

console.log(provider)