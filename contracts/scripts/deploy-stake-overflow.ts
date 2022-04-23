import { ethers } from "hardhat";

async function main() {
  console.log("Deploy StakeOverflow...");
  const factory = await ethers.getContractFactory("StakeOverflow");
  const stakeOverflow = await factory.deploy();

  await stakeOverflow.deployed();

  console.log("StakeOverflow deployed to: ", stakeOverflow.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
