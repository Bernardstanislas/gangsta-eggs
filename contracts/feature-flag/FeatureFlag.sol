// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol";
import "../interfaces/IFeatureFlag.sol";

contract FeatureFlag is
  IFeatureFlag,
  Initializable,
  ERC165StorageUpgradeable,
  OwnableUpgradeable
{
  bool private _mintingPaused;
  bool private _evolutionPaused;
  bool private _breedingPaused;

  function initialize() public initializer {
    __Ownable_init();
    __ERC165Storage_init();

    _registerInterface(type(IFeatureFlag).interfaceId);
    _mintingPaused = true;
    _evolutionPaused = true;
    _breedingPaused = true;
  }

  function mintingPaused() external view override returns (bool) {
    return _mintingPaused;
  }

  function evolutionPaused() external view override returns (bool) {
    return _evolutionPaused;
  }

  function breedingPaused() external view override returns (bool) {
    return _breedingPaused;
  }

  function setMintingPaused(bool _paused) external override onlyOwner {
    require(_paused == !_mintingPaused);
    _mintingPaused = _paused;
    if (_paused) {
      emit MintingPaused();
    } else {
      emit MintingUnpaused();
    }
  }

  function setEvolutionPaused(bool _paused) external override onlyOwner {
    require(_paused == !_evolutionPaused);
    _evolutionPaused = _paused;
    if (_paused) {
      emit EvolutionPaused();
    } else {
      emit EvolutionUnpaused();
    }
  }

  function setBreedingPaused(bool _paused) external override onlyOwner {
    require(_paused == !_breedingPaused);
    _breedingPaused = _paused;
    if (_paused) {
      emit BreedingPaused();
    } else {
      emit BreedingUnpaused();
    }
  }
}
