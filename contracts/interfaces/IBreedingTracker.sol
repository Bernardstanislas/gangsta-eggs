// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IBreedingTracker {
    function registerBreeding(uint256 chick1, uint256 chick2) external;
}
