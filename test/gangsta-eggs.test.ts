import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GangstaEggs", function () {
  let gangstaEggs: Contract;

  it("can be deployed", async () => {
    const GangstaEggs = await ethers.getContractFactory("GangstaEggs");
    gangstaEggs = await GangstaEggs.deploy();
    await gangstaEggs.deployed();
  });
});
