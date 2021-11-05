import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GangstaEggs", function () {
  let gangstaEggs: Contract;
  let owner: SignerWithAddress;
  const ipfsCid = "yolocroute";

  beforeEach(async () => {
    const GangstaEggs = await ethers.getContractFactory("GangstaEggs");
    gangstaEggs = await GangstaEggs.deploy();
    await gangstaEggs.deployed();
    const signers = await ethers.getSigners();
    owner = signers[0];
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
    await gangstaEggs.airdrop(signers[0].address, ipfsCid);

    expect(await gangstaEggs.tokenURI(0)).to.equal("");

    const baseTokenUri = "https://example.com/";
    await gangstaEggs.setBaseTokenURI(baseTokenUri);

    expect(await gangstaEggs.tokenURI(0)).to.equal("https://example.com/0");
  });

  describe("setMintingPrice()", () => {
    it("cannot set a null price", async () => {
      await expect(gangstaEggs.setMintingPrice(0)).to.be.reverted;
    });
  });

  describe("mint()", () => {
    it("needs payment", async () => {
      await expect(gangstaEggs.mint(ipfsCid)).to.be.reverted;
    });

    it("accepts minting when payment is gte minting price", async () => {
      await expect(
        gangstaEggs.mint(ipfsCid, {
          value: ethers.utils.parseEther("0.04"),
        })
      )
        .to.emit(gangstaEggs, "Transfer")
        .withArgs(ethers.constants.AddressZero, owner.address, 0);
      await expect(
        gangstaEggs.mint(ipfsCid, {
          value: ethers.utils.parseEther("0.08"),
        })
      )
        .to.emit(gangstaEggs, "Transfer")
        .withArgs(ethers.constants.AddressZero, owner.address, 1);

      await gangstaEggs.setMintingPrice(ethers.utils.parseEther("2"));

      await expect(
        gangstaEggs.mint(ipfsCid, {
          value: ethers.utils.parseEther("0.04"),
        })
      ).to.be.reverted;
      await expect(
        gangstaEggs.mint(ipfsCid, {
          value: ethers.utils.parseEther("2"),
        })
      )
        .to.emit(gangstaEggs, "Transfer")
        .withArgs(ethers.constants.AddressZero, owner.address, 2);
    });

    it("needs an IPFS CID", async () => {
      await expect(
        gangstaEggs.mint("", { value: ethers.utils.parseEther("1") })
      ).to.be.revertedWith("IPFS CID must not be empty");
    });

    it("cannot happend when the contract is paused", async () => {
      await gangstaEggs.pause();
      await expect(
        gangstaEggs.mint(ipfsCid, {
          value: ethers.utils.parseEther("0.04"),
        })
      ).to.be.revertedWith("Pausable: paused");
    });
  });
});
