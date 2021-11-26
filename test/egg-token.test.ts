import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {expect} from 'chai';
import {Contract} from 'ethers';
import {ethers, upgrades} from 'hardhat';

describe('EggToken', () => {
  let eggToken: Contract;
  let someFolk: SignerWithAddress;

  beforeEach(async () => {
    const signers = await ethers.getSigners();

    someFolk = signers[1];
    eggToken = await upgrades.deployProxy(
      await ethers.getContractFactory('EggToken'),
      [signers[2].address]
    );
    await eggToken.deployed();
  });

  describe('tokenURI()', () => {
    it('can be updated after deploying', async () => {
      await eggToken.safeMint(someFolk.address);
      expect(await eggToken.tokenURI(0)).to.equal(
        'https://api.gangsta-eggs.com/eggs/0'
      );

      await upgrades.upgradeProxy(
        eggToken,
        await ethers.getContractFactory('EggTokenTest')
      );
      expect(await eggToken.tokenURI(0)).to.equal(
        'https://api-test.gangsta-eggs.com/eggs/0'
      );
    });
  });

  describe('safeMint()', () => {
    it('returns the egg id', async () => {
      expect(await eggToken.callStatic.safeMint(someFolk.address)).to.equal(0);
    });
  });
});
