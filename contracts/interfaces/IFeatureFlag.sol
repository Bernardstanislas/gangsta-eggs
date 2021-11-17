// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IFeatureFlag {
  event MintingPaused();
  event MintingUnpaused();
  event BreedingPaused();
  event BreedingUnpaused();
  event EvolutionPaused();
  event EvolutionUnpaused();

  function mintingPaused() external view returns (bool);

  function evolutionPaused() external view returns (bool);

  function breedingPaused() external view returns (bool);

  function setMintingPaused(bool _paused) external;

  function setEvolutionPaused(bool _paused) external;

  function setBreedingPaused(bool _paused) external;
}
