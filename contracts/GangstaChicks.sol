// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Mintable.sol";
import "./IGangstaChicks.sol";

contract GangstaChicks is Mintable, IGangstaChicks {
    constructor() ERC721("GangstaChicks", "GCHK") {}

    function airdrop(address to, string memory ipfsCid) public onlyRole(MINTER_ROLE) {
        _mintWithIpfsCid(to, ipfsCid);
    }

    function mintChickFromEgg(address _to, string calldata _ipfsCid) external override returns (bool) {
        _mintWithIpfsCid(_to, _ipfsCid);
        return true;
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Mintable)
        returns (bool)
    {
        return
            interfaceId == type(IGangstaChicks).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
