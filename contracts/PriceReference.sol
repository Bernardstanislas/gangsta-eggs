// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./RoleBasedAccess.sol";

contract PriceReference is RoleBasedAccess {
    uint256 internal _mintingPrice;

    constructor() {
        _mintingPrice = 0.04 ether;
    }

    function setMintingPrice(uint256 _newMintingPrice) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_newMintingPrice > 0, "Minting price must be greater than 0");
        _mintingPrice = _newMintingPrice;
    }
}
