// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import "../interfaces/IProxyRegistry.sol";
import "../interfaces/IEggToken.sol";

contract EggToken is
  Initializable,
  ERC165StorageUpgradeable,
  ERC721Upgradeable,
  ERC721URIStorageUpgradeable,
  IEggToken,
  PausableUpgradeable,
  AccessControlUpgradeable,
  ERC721BurnableUpgradeable
{
  using CountersUpgradeable for CountersUpgradeable.Counter;

  bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  CountersUpgradeable.Counter private _tokenIdCounter;

  // OpenSea's Proxy Registry
  IProxyRegistry public proxyRegistry;

  function initialize(address _proxyRegistry) public initializer {
    __ERC721_init("GangstaEgg", "GEGG");
    __ERC721URIStorage_init();
    __Pausable_init();
    __AccessControl_init();
    __ERC721Burnable_init();

    _registerInterface(type(IEggToken).interfaceId);
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(PAUSER_ROLE, msg.sender);
    _setupRole(MINTER_ROLE, msg.sender);
    proxyRegistry = IProxyRegistry(_proxyRegistry);
  }

  function _baseURI() internal pure override returns (string memory) {
    return "https://api.gangsta-eggs.com/eggs/";
  }

  function pause() public onlyRole(PAUSER_ROLE) {
    _pause();
  }

  function unpause() public onlyRole(PAUSER_ROLE) {
    _unpause();
  }

  function safeMint(address to, string memory uri)
    external
    override
    onlyRole(MINTER_ROLE)
    returns (uint256)
  {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
    return tokenId;
  }

  function safeBurn(uint256 tokenId) external override onlyRole(MINTER_ROLE) {
    _burn(tokenId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override whenNotPaused {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  // The following functions are overrides required by Solidity.

  function _burn(uint256 tokenId)
    internal
    override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
  {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

  /**
   * @notice Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
   */
  function isApprovedForAll(address owner, address operator)
    public
    view
    override(IERC721Upgradeable, ERC721Upgradeable)
    returns (bool)
  {
    // Whitelist OpenSea proxy contract for easy trading.
    if (proxyRegistry.proxies(owner) == operator) {
      return true;
    }
    return super.isApprovedForAll(owner, operator);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(
      ERC165StorageUpgradeable,
      ERC721Upgradeable,
      AccessControlUpgradeable,
      IERC165Upgradeable
    )
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
