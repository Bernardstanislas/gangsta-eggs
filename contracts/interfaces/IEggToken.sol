// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";

interface IEggToken is IERC721Upgradeable {
    function safeMint(address to) external returns (uint256);
    function safeLay(address to) external returns (uint256);

    function safeBurn(uint256 tokenId) external;
}
