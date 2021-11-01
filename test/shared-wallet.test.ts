import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("SharedWallet", function () {
  let sharedWallet: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  before(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const SharedWallet = await ethers.getContractFactory("SharedWallet");
    sharedWallet = await SharedWallet.deploy(
      [owner.address, addr1.address, addr2.address],
      [1, 2, 3]
    );
    await sharedWallet.deployed();
  });

  it("should add payees shares when constructed", async function () {
    expect(await sharedWallet.totalShares()).to.equal(6);
  });

  it("should split payment when receiving ETH", async () => {
    expect(await sharedWallet.totalReleased()).to.equal(0);

    await owner.sendTransaction({
      to: sharedWallet.address,
      value: ethers.utils.parseEther("1"),
    });

    const walletBalance = await ethers.provider.getBalance(
      sharedWallet.address
    );
    expect(walletBalance).to.equal(ethers.utils.parseEther("1"));

    const ownerBalanceBeforeRelease = await owner.getBalance();

    await sharedWallet.release(owner.address);

    const ownerBalanceAfterRelease = await owner.getBalance();

    expect(
      ownerBalanceAfterRelease
        .sub(ownerBalanceBeforeRelease)
        .gt(ethers.utils.parseEther("0.166"))
    ).to.equal(true);
    expect(
      ownerBalanceAfterRelease
        .sub(ownerBalanceBeforeRelease)
        .lt(ethers.utils.parseEther("0.166666"))
    ).to.equal(true);
  });
});
