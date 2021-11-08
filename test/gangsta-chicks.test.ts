import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GangstaChicks", function () {
  let gangstaChicks: Contract;
  const ipfsCid = "yolocroute";
  let signers: SignerWithAddress[];

  beforeEach(async () => {
    const GangstaChicks = await ethers.getContractFactory("GangstaChicks");
    gangstaChicks = await GangstaChicks.deploy();
    await gangstaChicks.deployed();
    signers = await ethers.getSigners();
  });

  describe("mintChickFromEgg", () => {
    it("needs the EVOLVER role", async () => {
      await expect(
        gangstaChicks
          .connect(signers[1])
          .mintChickFromEgg(signers[2].address, ipfsCid)
      ).to.be.revertedWith(
        "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0xcbf38a01544922da03866be84bd120ea288e14e87ae11440145f17719d7a8369"
      );
    });
  });
});
