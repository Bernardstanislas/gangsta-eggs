// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IChickToken {
    function safeMint(address to, string memory uri) external;
}
