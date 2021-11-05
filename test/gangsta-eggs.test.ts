import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GangstaEggs", function () {
  let gangstaEggs: Contract;
  let gangstaChicks: Contract;
  let owner: SignerWithAddress;
  let signers: SignerWithAddress[];
  const ipfsCid = "yolocroute";

  beforeEach(async () => {
    const GangstaChicks = await ethers.getContractFactory("GangstaChicks");
    gangstaChicks = await GangstaChicks.deploy();
    await gangstaChicks.deployed();
  });

  beforeEach(async () => {
    const GangstaEggs = await ethers.getContractFactory("GangstaEggs");
    gangstaEggs = await GangstaEggs.deploy();
    await gangstaEggs.deployed();
    signers = await ethers.getSigners();
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

  describe("setGangstaChicks()", () => {
    it("cannot set a zero address contract", async () => {
      await expect(
        gangstaEggs.setGangstaChicks(ethers.constants.AddressZero)
      ).to.be.revertedWith("GangstaChicks address cannot be 0x0");
    });

    it("cannot set a contract that does not implement the IGangstaChicks interface", async () => {
      const GangstaEggs = await ethers.getContractFactory("GangstaEggs");
      const otherContract = await GangstaEggs.deploy();
      await otherContract.deployed();
      await expect(
        gangstaEggs.setGangstaChicks(otherContract.address)
      ).to.be.revertedWith(
        "GangstaChicks address does not support IGangstaChicks interface"
      );
    });

    it("succeeds to set the contract address if the address is a GangstaChick contract", async () => {
      await gangstaEggs.setGangstaChicks(gangstaChicks.address);
    });
  });

  describe("listTokens()", () => {
    it("reverts if token does not exist", async () => {
      await expect(gangstaEggs.tokenMetadata(0)).to.be.revertedWith(
        "ERC721: owner query for nonexistent token"
      );
    });

    it("reverts if caller does not own the token", async () => {
      await gangstaEggs.mint(ipfsCid, {
        value: ethers.utils.parseEther("0.04"),
      });
      const gangstaEggsWithNobod = await gangstaEggs.connect(signers[1]);
      await expect(gangstaEggsWithNobod.tokenMetadata(0)).to.be.revertedWith(
        "Only owner can access token metadata"
      );
    });

    it("returns the token metadata", async () => {
      await gangstaEggs.mint(ipfsCid, {
        value: ethers.utils.parseEther("0.04"),
      });
      expect(await gangstaEggs.tokenMetadata(0)).to.deep.equal([
        ethers.BigNumber.from(0),
        owner.address,
        [ipfsCid],
      ]);
    });
  });
});
