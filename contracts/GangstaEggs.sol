// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./RoleBasedAccess.sol";

contract GangstaEggs is ERC721, Pausable, RoleBasedAccess {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string private _baseTokenURI;

    uint256 private _mintingPrice;

    enum TokenType {
        EGG,
        CHICK
    }

    // Mapping from token id to token type
    mapping(uint256 => TokenType) private _tokenTypes;

    constructor() ERC721("GangstaEggs", "GEGG") {
        _mintingPrice = 0.04 ether;
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function safeMint(address to) public onlyRole(MINTER_ROLE) {
        _safeMint(to, _tokenIdCounter.current());
        _tokenIdCounter.increment();
    }

    function setBaseTokenURI(string memory _newBaseTokenURI) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(bytes(_newBaseTokenURI).length > 0, "Base token URI must not be empty");
        _baseTokenURI = _newBaseTokenURI;
    }

    function setMintingPrice(uint256 _newMintingPrice) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_newMintingPrice > 0, "Minting price must be greater than 0");
        _mintingPrice = _newMintingPrice;
    }

    function mint() public payable {
        require(msg.value >= _mintingPrice, "Minting price is higher than provided payment");
        _safeMint(_msgSender(), _tokenIdCounter.current());
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
