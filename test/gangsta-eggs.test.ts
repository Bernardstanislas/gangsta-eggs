import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GangstaEggs", function () {
  let gangstaEggs: Contract;

  beforeEach(async () => {
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

  it("can set the baseTokenUri", async () => {
    const signers = await ethers.getSigners();
    await gangstaEggs.safeMint(signers[0].address);

    expect(await gangstaEggs.tokenURI(0)).to.equal("");

    const baseTokenUri = "https://example.com/";
    await gangstaEggs.setBaseTokenURI(baseTokenUri);

    expect(await gangstaEggs.tokenURI(0)).to.equal("https://example.com/0");
  });
});
