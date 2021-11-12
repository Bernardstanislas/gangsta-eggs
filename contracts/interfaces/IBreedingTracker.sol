// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IBreedingTracker {
    event Breeding(uint256 indexed chick1, uint256 chick2);
    function safeRegisterBreeding(uint256 chick1, uint256 chick2) external;
}
