const hre = require("hardhat");

async function main() {
  const KV = await hre.ethers.getContractFactory("KV");
  const kv = await KV.deploy();
  console.log(kv)

  console.log(
    `KV Contract deployed to ${kv.address}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
