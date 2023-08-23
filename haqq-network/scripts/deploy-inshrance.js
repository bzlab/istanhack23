const hre = require("hardhat");

async function main() {
  const Inshrance = await hre.ethers.getContractFactory("Inshrance");
  console.log(Inshrance);
  const insh = await Inshrance.deploy();
  console.log(insh);
  console.log(`Inshrance Contract deployed`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
