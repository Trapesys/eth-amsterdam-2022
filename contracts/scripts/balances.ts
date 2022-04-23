// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  const balances = await Promise.all(
    accounts.map(
      async (a) => await Promise.all([a.getAddress(), a.getBalance()])
    )
  );

  console.log("Balances");
  balances.forEach(([add, bal], idx) => {
    console.log(`#${idx} ${add} => ${bal.toString()}`);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
