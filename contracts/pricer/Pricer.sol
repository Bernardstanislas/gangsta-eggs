// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol";
import "../interfaces/IPricer.sol";
import "../interfaces/IGenerationTracker.sol";

contract Pricer is
  IPricer,
  Initializable,
  OwnableUpgradeable,
  ERC165StorageUpgradeable
{
  using SafeMathUpgradeable for uint256;
  using ERC165CheckerUpgradeable for address;

  uint256 private _airdroppedEggsLimit;
  uint256 private _eggsStartingPrice;
  uint256 private _eggsEndingPrice;
  uint256 private _firstGenerationSize;
  uint256 private _breedingPrice;
  IGenerationTracker private _generationTracker;

  modifier notNull(uint256 number) {
    require(number > 0, "Provided number must be greater than 0");
    _;
  }

  function initialize(
    address _tracker,
    uint256 airdropEggsLimit_,
    uint256 startingPrice_,
    uint256 endingPrice_,
    uint256 firstGenerationSize_,
    uint256 breedingPrice_
  )
    public
    initializer
    notNull(startingPrice_)
    notNull(endingPrice_)
    notNull(breedingPrice_)
  {
    __Ownable_init();
    __ERC165Storage_init();

    _registerInterface(type(IPricer).interfaceId);
    _setGenerationTracker(_tracker);
    setParameters(
      airdropEggsLimit_,
      startingPrice_,
      endingPrice_,
      firstGenerationSize_,
      breedingPrice_
    );
  }

  function setParameters(
    uint256 airdropEggsLimit_,
    uint256 startingPrice_,
    uint256 endingPrice_,
    uint256 firstGenerationSize_,
    uint256 breedingPrice_
  )
    public
    notNull(startingPrice_)
    notNull(endingPrice_)
    notNull(breedingPrice_)
    onlyOwner
  {
    _setFirstGenerationSize(firstGenerationSize_, airdropEggsLimit_);
    _setAirdroppedEggsLimit(airdropEggsLimit_, firstGenerationSize_);
    _eggsStartingPrice = startingPrice_;
    _eggsEndingPrice = endingPrice_;
    _breedingPrice = breedingPrice_;
  }

  function mintingPrice() external view override returns (uint256) {
    uint256 eggCount = _generationTracker.firstGenerationEggsCount();
    require(eggCount <= _firstGenerationSize);
    if (eggCount < _airdroppedEggsLimit) {
      return 0;
    } else {
      require(eggCount > 0, "Linear pricing starts when airdrop is finished");
      uint256 _priceDelta = _eggsEndingPrice.sub(_eggsStartingPrice);
      uint256 _payableEggsCount = _firstGenerationSize.sub(
        _airdroppedEggsLimit
      );
      uint256 price = _eggsStartingPrice
        .add(_priceDelta.mul(eggCount).div(_payableEggsCount))
        .sub(_priceDelta.mul(_airdroppedEggsLimit).div(_payableEggsCount));
      return price;
    }
  }

  function breedingPrice() external view override returns (uint256) {
    return _breedingPrice;
  }

  function airdropFinished() external view override returns (bool) {
    uint256 eggCount = _generationTracker.firstGenerationEggsCount();
    return eggCount >= _airdroppedEggsLimit;
  }

  function _setAirdroppedEggsLimit(uint256 _limit, uint256 firstGenerationSize_)
    private
    notNull(_limit)
  {
    require(_limit < firstGenerationSize_);
    _airdroppedEggsLimit = _limit;
  }

  function _setFirstGenerationSize(uint256 _size, uint256 airdropEggsLimit_)
    private
    notNull(_size)
  {
    require(_size > airdropEggsLimit_);
    require(_size >= _generationTracker.firstGenerationEggsCount());
    _firstGenerationSize = _size;
  }

  function _setGenerationTracker(address _tracker) internal {
    require(_tracker != address(0));
    require(
      _tracker.supportsInterface(type(IGenerationTracker).interfaceId),
      "GenerationTracker does not support IGenerationTracker interface"
    );
    _generationTracker = IGenerationTracker(_tracker);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC165StorageUpgradeable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
