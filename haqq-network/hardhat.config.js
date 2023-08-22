require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

// console.log(process.env.PRIVATE_KEY)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "haqqTestnet",
  networks: {
    hardhat: {},
    haqqTestnet: {
      url: "https://rpc.eth.testedge2.haqq.network",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};