import { ethers } from "hardhat";
import { StakeOverflow } from "../typechain";

const STAKE_OVERFLOW_ADDRESS = process.env.STAKE_OVERFLOW_ADDRESS ?? "";

async function main() {
  const stakeOverflow = (await (
    await ethers.getContractFactory("StakeOverflow")
  ).attach(STAKE_OVERFLOW_ADDRESS)) as StakeOverflow;

  const tx = await stakeOverflow.createQuestion(
    "0x13224343",
    "How to use Edge",
    ["Polygon", "Golang"],
    {
      value: ethers.BigNumber.from(10).pow(17),
      gasLimit: "0x50000",
    }
  );
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
