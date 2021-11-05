// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Mintable.sol";

contract GangstaEggs is Mintable {

    constructor() ERC721("GangstaEggs", "GEGG") {}

    function airdrop(address to, string memory ipfsCid) public onlyRole(MINTER_ROLE) {
        _mintWithIpfsCid(to, ipfsCid);
    }

    function mint(string memory ipfsCid) public payable {
        require(msg.value >= _mintingPrice, "Minting price is higher than provided payment");
        _mintWithIpfsCid(_msgSender(), ipfsCid);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Mintable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
