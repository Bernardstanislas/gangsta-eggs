// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol";
import "../interfaces/IGenerationTracker.sol";

contract GenerationTracker is
  IGenerationTracker,
  Initializable,
  ERC165StorageUpgradeable,
  AccessControlUpgradeable
{
  using CountersUpgradeable for CountersUpgradeable.Counter;
  using SafeMathUpgradeable for uint256;

  mapping(uint256 => Generation) private eggsGeneration;
  CountersUpgradeable.Counter private _firstGenerationEggsCounter;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER");
  bytes32 public constant LAYER_ROLE = keccak256("LAYER");

  function initialize(address _minter, address _layer) public initializer {
    require(_minter != address(0), "Minter address cannot be 0");
    require(_layer != address(0), "Layer address cannot be 0");
    __AccessControl_init();
    __ERC165Storage_init();

    _registerInterface(type(IGenerationTracker).interfaceId);
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(MINTER_ROLE, _minter);
    _setupRole(LAYER_ROLE, _layer);
  }

  function registerNewlyMintedEgg(uint256 _eggId)
    external
    override
    onlyRole(MINTER_ROLE)
  {
    require(
      eggsGeneration[_eggId] == Generation.UNKNOWN,
      "Egg already registered"
    );
    eggsGeneration[_eggId] = Generation.FIRST;
    _firstGenerationEggsCounter.increment();
  }

  function registerNewlyLayedEgg(uint256 _eggId)
    external
    override
    onlyRole(LAYER_ROLE)
  {
    require(
      eggsGeneration[_eggId] == Generation.UNKNOWN,
      "Egg already registered"
    );
    eggsGeneration[_eggId] = Generation.SECOND;
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
    override(ERC165StorageUpgradeable, AccessControlUpgradeable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
