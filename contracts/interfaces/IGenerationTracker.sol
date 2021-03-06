// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IGenerationTracker {
  enum Generation {
    UNKNOWN,
    FIRST,
    SECOND
  }

  event MintedEggRegistered(uint256 id);
  event LayedEggRegistered(uint256 id);

  function registerNewlyMintedEgg(uint256 _eggId) external;

  function registerNewlyLayedEgg(uint256 _eggId) external;

  function eggGeneration(uint256 _eggId) external view returns (Generation);

  function firstGenerationEggsCount() external view returns (uint256);
}
