// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol";
import "./interfaces/IBreedingTracker.sol";
import "./interfaces/IEggToken.sol";
import "./interfaces/IChickToken.sol";
import "./interfaces/IFeatureFlag.sol";
import "./interfaces/IGenerationTracker.sol";
import "./interfaces/IMintingQuota.sol";
import "./interfaces/IPricer.sol";

contract GangstaEggs is Initializable, OwnableUpgradeable {
  using ERC165CheckerUpgradeable for address;

  IBreedingTracker private _breedingTracker;
  IEggToken private _eggToken;
  IChickToken private _chickToken;
  IFeatureFlag private _featureFlag;
  IGenerationTracker private _generationTracker;
  IMintingQuota private _mintingQuota;
  IPricer private _pricer;

  modifier mintingEnabled() {
    require(!_featureFlag.mintingPaused(), "Minting is paused");
    _;
  }

  modifier mintingPricePaid() {
    require(msg.value >= _pricer.mintingPrice(), "Minting price not paid");
    _;
  }

  modifier mintingQuotaRemaining(address to_) {
    require(
      _mintingQuota.remainingMinting(to_) > 0,
      "Minting quota has been exhausted"
    );
    _;
  }

  function initialize(
    address breedingTracker_,
    address eggToken_,
    address chickToken_,
    address featureFlag_,
    address generationTracker_,
    address mintingQuota_,
    address pricer_
  ) public initializer {
    __Ownable_init();

    _isInterface(breedingTracker_, type(IBreedingTracker).interfaceId);
    _isInterface(eggToken_, type(IEggToken).interfaceId);
    _isInterface(chickToken_, type(IChickToken).interfaceId);
    _isInterface(featureFlag_, type(IFeatureFlag).interfaceId);
    _isInterface(generationTracker_, type(IGenerationTracker).interfaceId);
    _isInterface(mintingQuota_, type(IMintingQuota).interfaceId);
    _isInterface(pricer_, type(IPricer).interfaceId);

    _breedingTracker = IBreedingTracker(breedingTracker_);
    _eggToken = IEggToken(eggToken_);
    _chickToken = IChickToken(chickToken_);
    _featureFlag = IFeatureFlag(featureFlag_);
    _generationTracker = IGenerationTracker(generationTracker_);
    _mintingQuota = IMintingQuota(mintingQuota_);
    _pricer = IPricer(pricer_);
  }

  function airdropEgg(address to_, string memory ipfsHash_)
    public
    onlyOwner
    mintingEnabled
  {
    _mintEgg(to_, ipfsHash_);
  }

  function mintEgg(address to_, string memory ipfsHash_)
    public
    payable
    mintingEnabled
    mintingPricePaid
  {
    _mintEgg(to_, ipfsHash_);
  }

  function _mintEgg(address to_, string memory ipfsHash_) private {
    _mintingQuota.safeRegisterMinting(to_);
    uint256 eggId = _eggToken.safeMint(to_, ipfsHash_);
    _generationTracker.registerNewlyMintedEgg(eggId);
  }

  function _isInterface(address interfaceAddress, bytes4 interfaceId)
    private
    view
  {
    require(interfaceAddress != address(0), "Address cannot be 0");
    require(
      interfaceAddress.supportsInterface(interfaceId),
      "Provided contract does not implement expected interface"
    );
  }
}
