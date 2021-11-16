// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol";
import "../interfaces/IMintingQuota.sol";
import "../interfaces/IPricer.sol";

contract MintingQuota is
  IMintingQuota,
  Initializable,
  ERC165StorageUpgradeable,
  OwnableUpgradeable
{
  using SafeMathUpgradeable for uint256;
  using ERC165CheckerUpgradeable for address;

  uint8 private constant MAX_MINTING_QUOTAS = 10;
  uint8 private constant AIRDROP_MINTING_QUOTAS = 1;

  IPricer private _pricer;
  mapping(address => uint256) private _mintingCount;

  function initialize(address _pricerAddress) public initializer {
    __Ownable_init();
    __ERC165Storage_init();

    _registerInterface(type(IMintingQuota).interfaceId);
    _setPricer(_pricerAddress);
  }

  function safeRegisterMinting(address _to) external override onlyOwner {
    require(_canMint(_to), "Cannot mint anymore");
    _mintingCount[_to] = _mintingCount[_to].add(1);
  }

  function remainingMinting(address _to) public view returns (uint256) {
    bool airdropFinished = _pricer.airdropFinished();
    if (airdropFinished) {
      return uint256(MAX_MINTING_QUOTAS).sub(_mintingCount[_to]);
    } else {
      return uint256(AIRDROP_MINTING_QUOTAS).sub(_mintingCount[_to]);
    }
  }

  function _canMint(address _to) internal view returns (bool) {
    return remainingMinting(_to) > 0;
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC165StorageUpgradeable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _setPricer(address _pricerAddress) internal {
    require(_pricerAddress != address(0));
    require(
      _pricerAddress.supportsInterface(type(IPricer).interfaceId),
      "Pricer does not support IPricer interface"
    );
    _pricer = IPricer(_pricerAddress);
  }
}
