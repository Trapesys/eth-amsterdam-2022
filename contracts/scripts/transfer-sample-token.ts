import { ethers } from "hardhat";

async function main() {
  const [signer, recipient] = await ethers.getSigners();
  console.log("Deploy SampleToken...");
  const factory = await ethers.getContractFactory("SampleToken");
  const sampleToken = await factory.attach(
    "0xa55dB47894767fEf8Da36ad44d0B25c4338E06f9"
  );

  const tx = await sampleToken.transfer(
    recipient.address,
    ethers.BigNumber.from(10).pow(18)
  );

  console.log("sending transaction", tx.hash);

  const r = await tx.wait();

  console.log("done", r);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
