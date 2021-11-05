// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "./Mintable.sol";
import "./GangstaChicks.sol";
import "./IGangstaChicks.sol";

contract GangstaEggs is Mintable {
    using ERC165Checker for address;
    GangstaChicks private gangstaChicks;

    constructor() ERC721("GangstaEggs", "GEGG") {}

    function airdrop(address to, string memory ipfsCid) public onlyRole(MINTER_ROLE) {
        _mintWithIpfsCid(to, ipfsCid);
    }

    function mint(string memory ipfsCid) public payable {
        require(msg.value >= _mintingPrice, "Minting price is higher than provided payment");
        _mintWithIpfsCid(_msgSender(), ipfsCid);
    }

    function setGangstaChicks(address _address) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_address != address(0), "GangstaChicks address cannot be 0x0");
        require(_address.supportsInterface(type(IGangstaChicks).interfaceId), "GangstaChicks address does not support IGangstaChicks interface");
        gangstaChicks = GangstaChicks(_address);
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
