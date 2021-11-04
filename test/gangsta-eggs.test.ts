import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GangstaEggs", function () {
  let gangstaEggs: Contract;

  before(async () => {
    const GangstaEggs = await ethers.getContractFactory("GangstaEggs");
    gangstaEggs = await GangstaEggs.deploy();
    await gangstaEggs.deployed();
  });

  it("can be paused by the pauser role", async () => {
    expect(await gangstaEggs.paused()).to.be.false;

    await gangstaEggs.pause();
    expect(await gangstaEggs.paused()).to.be.true;

    await gangstaEggs.unpause();
    expect(await gangstaEggs.paused()).to.be.false;
  });

  it("cannot be paused by someone else", async () => {
    const signers = await ethers.getSigners();

    const gangstaEggsWithNobod = await gangstaEggs.connect(signers[1]);
    await expect(gangstaEggsWithNobod.pause()).to.be.reverted;
  });
});
