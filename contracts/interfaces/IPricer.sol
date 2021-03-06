// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IPricer {
  function mintingPrice() external view returns (uint256);

  function breedingPrice() external view returns (uint256);

  function airdropFinished() external view returns (bool);

  function mintingLimit() external view returns (uint256);
}
