const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const advancedStorage = await ethers.getContractFactory("AdvancedStorage");
  console.log("Funding contract...");
  const transactionResponse = await advancedStorage.add("5");
  await transactionResponse.wait(1);
  const ret = await advancedStorage.get("4576");
  console.log(ret);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
  });
