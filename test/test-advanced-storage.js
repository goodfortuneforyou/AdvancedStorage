const { assert } = require("chai");
const { deploy, ethers } = require("hardhat");

describe("AdvancedStorage", async function () {
  let advancedStorage;
  beforeEach(async function () {
    const advancedStorageFactory = await ethers.getContractFactory(
      "AdvancedStorage"
    );
    advancedStorage = await advancedStorageFactory.deploy();
  });
  it("should add an element to ids arry", async () => {
    const expected = 10;
    await advancedStorage.add(expected);
    const result = await advancedStorage.ids(0);
    assert.equal(result.toString(), expected);
  });
});
