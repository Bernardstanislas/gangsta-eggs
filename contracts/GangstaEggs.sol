// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PullPaymentUpgradeable.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";
import "@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "./interfaces/IBreedingTracker.sol";
import "./interfaces/IEggToken.sol";
import "./interfaces/IChickToken.sol";
import "./interfaces/IFeatureFlag.sol";
import "./interfaces/IGenerationTracker.sol";
import "./interfaces/IMintingQuota.sol";
import "./interfaces/IPricer.sol";

contract GangstaEggs is
  Initializable,
  ReentrancyGuardUpgradeable,
  OwnableUpgradeable,
  PullPaymentUpgradeable,
  ERC2771ContextUpgradeable
{
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

  modifier evolutionEnabled() {
    require(!_featureFlag.evolutionPaused(), "Evolution is paused");
    _;
  }

  modifier breedingEnabled() {
    require(!_featureFlag.breedingPaused(), "Breeding is paused");
    _;
  }

  modifier onlyEggOwner(uint256 _eggId) {
    require(
      _eggToken.ownerOf(_eggId) == _msgSender(),
      "Only egg owner can evolve egg"
    );
    _;
  }

  modifier mintingPricePaid() {
    require(msg.value >= _pricer.mintingPrice(), "Minting price not paid");
    _;
  }

  modifier breedingPricePaid() {
    require(msg.value >= _pricer.breedingPrice(), "Breeding price not paid");
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
    address pricer_,
    address trustedForwarder_
  ) public initializer {
    __Ownable_init();
    __ReentrancyGuard_init();
    __PullPayment_init();
    __ERC2771Context_init(trustedForwarder_);

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

  function airdropEgg(address to_)
    public
    onlyOwner
    mintingEnabled
    mintingQuotaRemaining(to_)
    nonReentrant
  {
    _mintEgg(to_);
  }

  function mintEgg()
    public
    payable
    mintingEnabled
    mintingPricePaid
    mintingQuotaRemaining(_msgSender())
    nonReentrant
  {
    _mintEgg(_msgSender());
    _asyncTransfer(owner(), msg.value);
  }

  function evolveEgg(uint256 _eggId)
    public
    evolutionEnabled
    onlyEggOwner(_eggId)
    nonReentrant
  {
    _eggToken.safeBurn(_eggId);
    _chickToken.safeMint(_msgSender());
  }

  function breedChicks(uint256 _chickId1, uint256 _chickId2)
    public
    payable
    breedingEnabled
    breedingPricePaid
    nonReentrant
  {
    _breedingTracker.safeRegisterBreeding(_chickId1, _chickId2);
    uint256 eggId = _eggToken.safeLay(_msgSender());
    _generationTracker.registerNewlyLayedEgg(eggId);
    _asyncTransfer(owner(), msg.value);
  }

  function _mintEgg(address to_) private {
    _mintingQuota.safeRegisterMinting(to_);
    uint256 eggId = _eggToken.safeMint(to_);
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

  function _msgSender()
    internal
    view
    virtual
    override(ContextUpgradeable, ERC2771ContextUpgradeable)
    returns (address)
  {
    return ERC2771ContextUpgradeable._msgSender();
  }

  function _msgData()
    internal
    view
    virtual
    override(ContextUpgradeable, ERC2771ContextUpgradeable)
    returns (bytes calldata)
  {
    return ERC2771ContextUpgradeable._msgData();
  }
}
