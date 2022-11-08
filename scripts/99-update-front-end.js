const { ethers, network } = require("hardhat");
const { fs } = require("fs-extra");

const FRONT_END_ADDRESSES_FILE =
  "../4-advanced-storage/front_end/constants/contractAddresses.json";
const FRONT_END_ABI_FILE =
  "../../4-advanced-storage/front_end/constants/abi.json";

module.exports = async function () {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Updating front end...");
    // updateContractAddresses();
    updateAbi();
  }
};
async function updateAbi() {
  const advancedStorage = await ethers.getContract("AdvancedStorage");
  fs.writeFileSync(
    FRONT_END_ABI_FILE,
    advancedStorage.interface.format(ethers.utils.FormatTypes.JSON)
  );
}

async function updateContractAddresses() {
  const advancedStorage = await ethers.getContractAt("AdvancedStorage");
  const currentAddress = JSON.parse(
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, "utf8")
  );
  const chainId = network.config.chainId.toString();
  if (chainId in currentAddress) {
    if (!currentAddress[chainId].includes(advancedStorage.address)) {
      currentAddress[chainId].push(advancedStorage.address);
    }
  }
  {
    currentAddress[chainId] = [advancedStorage.address];
  }
  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddress));
}
module.exports.tags = ["frontend", "all"];
