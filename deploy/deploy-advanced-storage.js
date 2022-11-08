const { verify } = require("../utils/verify");
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("Deploying contracts...");
  const advancedStorage = await deploy("AdvancedStorage", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    await verify(advancedStorage.address, []);
  }
  console.log(
    `AdvancedStorage contract deployed at ${advancedStorage.address}`
  );
};

module.exports.tags = ["all"];
