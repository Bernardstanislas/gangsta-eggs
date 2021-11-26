// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";

interface IChickToken is IERC721Upgradeable {
  function safeMint(address to) external returns (uint256);
}
