// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol";
import "../interfaces/IGenerationTracker.sol";

contract GenerationTracker is
  IGenerationTracker,
  Initializable,
  ERC165StorageUpgradeable,
  OwnableUpgradeable
{
  using CountersUpgradeable for CountersUpgradeable.Counter;
  using SafeMathUpgradeable for uint256;

  mapping(uint256 => Generation) private eggsGeneration;
  CountersUpgradeable.Counter private _firstGenerationEggsCounter;

  modifier notRegistered(uint256 _eggId) {
    require(
      eggsGeneration[_eggId] == Generation.UNKNOWN,
      "Egg already registered"
    );
    _;
  }

  function initialize() public initializer {
    __Ownable_init();
    __ERC165Storage_init();

    _registerInterface(type(IGenerationTracker).interfaceId);
  }

  function registerNewlyMintedEgg(uint256 _eggId)
    external
    override
    onlyOwner
    notRegistered(_eggId)
  {
    eggsGeneration[_eggId] = Generation.FIRST;
    _firstGenerationEggsCounter.increment();
    emit MintedEggRegistered(_eggId);
  }

  function registerNewlyLayedEgg(uint256 _eggId)
    external
    override
    onlyOwner
    notRegistered(_eggId)
  {
    eggsGeneration[_eggId] = Generation.SECOND;
    emit LayedEggRegistered(_eggId);
  }

  function eggGeneration(uint256 _eggId)
    external
    view
    override
    returns (Generation)
  {
    require(eggsGeneration[_eggId] != Generation.UNKNOWN, "Egg not registered");
    return eggsGeneration[_eggId];
  }

  function firstGenerationEggsCount() external view override returns (uint256) {
    return _firstGenerationEggsCounter.current();
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
