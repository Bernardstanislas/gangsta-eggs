// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./RoleBasedAccess.sol";
import "./PriceReference.sol";
import "./WithPause.sol";

abstract contract Mintable is WithPause, PriceReference {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct TokenMetadatum {
        string ipfsCid;
    }

    mapping(uint256 => TokenMetadatum) private _tokenMetadata;

    function _mintWithIpfsCid(address to, string memory ipfsCid) internal  {
        require(bytes(ipfsCid).length > 0, "IPFS CID must not be empty");

        uint256 tokenId = _tokenIdCounter.current();
        require(bytes(_tokenMetadata[tokenId].ipfsCid).length == 0, "Token already has an IPFS CID");

        _safeMint(to, tokenId);
        _tokenMetadata[tokenId] = TokenMetadatum(ipfsCid);
        _tokenIdCounter.increment();
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(WithPause, RoleBasedAccess)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
