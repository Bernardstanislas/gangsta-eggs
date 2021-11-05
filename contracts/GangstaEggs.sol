// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./RoleBasedAccess.sol";
import "./PriceReference.sol";
import "./WithPause.sol";
import "./TokenBaseUriReference.sol";

contract GangstaEggs is WithPause, PriceReference {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct TokenMetadatum {
        string ipfsCid;
    }

    mapping(uint256 => TokenMetadatum) private _tokenMetadata;

    constructor() ERC721("GangstaEggs", "GEGG") {}

    function airdrop(address to, string memory ipfsCid) public onlyRole(MINTER_ROLE) {
        _mintWithIpfsCid(to, ipfsCid);
    }

    function mint(string memory ipfsCid) public payable {
        require(msg.value >= _mintingPrice, "Minting price is higher than provided payment");
        _mintWithIpfsCid(_msgSender(), ipfsCid);
    }

    function _mintWithIpfsCid(address to, string memory ipfsCid) private  {
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
        override(WithPause, RoleBasedAccess)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
