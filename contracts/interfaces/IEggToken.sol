// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IEggToken {
    function safeMint(address to, string memory uri) external;
    function safeBurn(uint256 tokenId) external;
}
