// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // const accounts = await ethers.getSigners();

  // const tx = await accounts[2].sendTransaction({
  //   to: "0xe1e48ABF14af25422aB95D78db37e2dEEe1Ad8FA",
  //   value: await accounts[2].getBalance(),
  // });
  // const r = (await tx).wait();

  // console.log("Balances", r);

  console.log(
    await ethers.provider.getBalance(
      "0xe1e48ABF14af25422aB95D78db37e2dEEe1Ad8FA"
    )
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
