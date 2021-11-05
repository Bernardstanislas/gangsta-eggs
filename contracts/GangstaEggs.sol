// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./RoleBasedAccess.sol";
import "./PriceReference.sol";

contract GangstaEggs is ERC721, Pausable, RoleBasedAccess, PriceReference {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string private _baseTokenURI;

    struct TokenMetadatum {
        string ipfsCid;
    }

    mapping(uint256 => TokenMetadatum) private _tokenMetadata;

    constructor() ERC721("GangstaEggs", "GEGG") {}

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function airdrop(address to, string memory ipfsCid) public onlyRole(MINTER_ROLE) {
        _mintWithIpfsCid(to, ipfsCid);
    }

    function setBaseTokenURI(string memory _newBaseTokenURI) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(bytes(_newBaseTokenURI).length > 0, "Base token URI must not be empty");
        _baseTokenURI = _newBaseTokenURI;
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

    function _baseURI() internal view override(ERC721) returns (string memory) {
        return _baseTokenURI;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, RoleBasedAccess)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
