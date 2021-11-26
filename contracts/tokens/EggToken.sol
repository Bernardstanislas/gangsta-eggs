// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
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
  IEggToken,
  PausableUpgradeable,
  AccessControlUpgradeable,
  ERC721BurnableUpgradeable
{
  using CountersUpgradeable for CountersUpgradeable.Counter;

  bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  CountersUpgradeable.Counter private _tokenIdCounter;
  CountersUpgradeable.Counter private _secondGenerationTokenIdCounter;

  // OpenSea's Proxy Registry
  IProxyRegistry public proxyRegistry;

  function initialize(address _proxyRegistry) public initializer {
    __ERC721_init("GangstaEgg", "GEGG");
    __Pausable_init();
    __AccessControl_init();
    __ERC721Burnable_init();

    _registerInterface(type(IEggToken).interfaceId);
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(PAUSER_ROLE, msg.sender);
    _setupRole(MINTER_ROLE, msg.sender);
    proxyRegistry = IProxyRegistry(_proxyRegistry);

    for (uint256 i = 0; i < 4444; i++) {
      _secondGenerationTokenIdCounter.increment();
    }
  }

  function contractURI() public pure returns (string memory) {
    return "https://api.gangsta-eggs.com/eggs-metadata";
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

  function safeMint(address to)
    external
    override
    onlyRole(MINTER_ROLE)
    returns (uint256)
  {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    return tokenId;
  }

  function safeLay(address to)
    external
    override
    onlyRole(MINTER_ROLE)
    returns (uint256)
  {
    uint256 tokenId = _secondGenerationTokenIdCounter.current();
    _secondGenerationTokenIdCounter.increment();
    _safeMint(to, tokenId);
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
