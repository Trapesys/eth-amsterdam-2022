import { ethers } from "hardhat";
import { StakeOverflow } from "../typechain";

const STAKE_OVERFLOW_ADDRESS = process.env.STAKE_OVERFLOW_ADDRESS ?? "";

async function main() {
  const stakeOverflow = (await (
    await ethers.getContractFactory("StakeOverflow")
  ).attach(STAKE_OVERFLOW_ADDRESS)) as StakeOverflow;

  const tx = await stakeOverflow.rewardDirectly(1, 3, {
    value: ethers.BigNumber.from(10).pow(17),
  });
  console.log("TxHash", tx.hash);
  const r = await tx.wait();

  console.log("Question Added ", r);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
