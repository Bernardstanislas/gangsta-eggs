// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol";
import "../interfaces/IBreedingTracker.sol";
import "../interfaces/IChickToken.sol";

contract BreedingTracker is IBreedingTracker, Initializable, ERC165StorageUpgradeable, AccessControlUpgradeable  {
    using SafeMathUpgradeable for uint256;
    using ERC165CheckerUpgradeable for address;

    bytes32 public constant BREEDER_ROLE = keccak256("BREEDER_ROLE");
    uint8 public constant BREEDING_LIMIT = 2;

    IChickToken private _chickToken;
    mapping (uint256 => uint256[]) private breedings;

    function initialize(address chickToken) initializer public {
        __AccessControl_init();
        __ERC165Storage_init();

        _registerInterface(type(IBreedingTracker).interfaceId);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(BREEDER_ROLE, msg.sender);
        _setChickToken(chickToken);
    }

    function safeRegisterBreeding(uint256 chick1, uint256 chick2) external override onlyRole(BREEDER_ROLE) {
        require(_chickToken.ownerOf(chick1) == _chickToken.ownerOf(chick2), "Chick1 and chick2 must be owned by the same owner");
        require(breedings[chick1].length < BREEDING_LIMIT, "First chick cannot breed anymore");
        require(breedings[chick2].length < BREEDING_LIMIT, "Second chick cannot breed anymore");
        require(chick1 != chick2, "Chick1 and chick2 cannot be the same");
        for (uint i = 0; i < breedings[chick1].length - 1; i++) {
            require(breedings[chick1][i] != chick2, "Chick1 and chick2 have already breeded");
        }
        for (uint i = 0; i < breedings[chick2].length - 1; i++) {
            require(breedings[chick2][i] != chick1, "Chick1 and chick2 have already breeded");
        }
        breedings[chick1].push(chick2);
        breedings[chick2].push(chick1);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165StorageUpgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _setChickToken(address chickToken) internal {
        require(chickToken != address(0));
        require(chickToken.supportsInterface(type(IChickToken).interfaceId), "ChickToken does not support IChickToken interface");
        _chickToken = IChickToken(chickToken);
    }
}
