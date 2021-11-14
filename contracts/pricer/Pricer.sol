// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol";
import "../interfaces/IPricer.sol";
import "../interfaces/IGenerationTracker.sol";

contract Pricer is IPricer, Initializable, ERC165StorageUpgradeable, AccessControlUpgradeable  {
    using SafeMathUpgradeable for uint256;
    using ERC165CheckerUpgradeable for address;

    uint256 private _airdroppedEggsLimit;
    uint256 private _eggsStartingPrice;
    uint256 private _eggsEndingPrice;
    uint256 private _firstGenerationSize;
    uint256 private _breedingPrice;
    IGenerationTracker private _generationTracker;
    
    bytes32 public constant CFO_ROLE = keccak256("CFO_ROLE");

    function initialize(address _tracker) initializer public {
        __AccessControl_init();
        __ERC165Storage_init();

        _registerInterface(type(IPricer).interfaceId);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CFO_ROLE, msg.sender);
        _airdroppedEggsLimit = 200;
        _eggsStartingPrice = 0.015 ether;
        _eggsEndingPrice = 0.06 ether;
        _firstGenerationSize = 4444;
        _breedingPrice = 0.02 ether;
        _setGenerationTracker(_tracker);
    }

    function setAirdroppedEggsLimit(uint256 _limit) public onlyRole(CFO_ROLE) {
        require(_limit > 0);
        require(_limit < _firstGenerationSize);
        _airdroppedEggsLimit = _limit;
    }

    function setEggsStartingPrice(uint256 _price) public onlyRole(CFO_ROLE) {
        require(_price > 0);
        _eggsStartingPrice = _price;
    }

    function setEggsEndingPrice(uint256 _price) public onlyRole(CFO_ROLE) {
        require(_price > 0);
        _eggsEndingPrice = _price;
    }

    function setFirstGenerationSize(uint256 _size) public onlyRole(CFO_ROLE) {
        require(_size > 0);
        require(_size > _airdroppedEggsLimit);
        require(_size >= _generationTracker.firstGenerationEggsCount());
        _firstGenerationSize = _size;
    }

    function setBreedingPrice(uint256 _price) public onlyRole(CFO_ROLE) {
        require(_price > 0);
        _breedingPrice = _price;
    }

    function mintingPrice() external view override returns (uint256) {
        uint256 eggCount = _generationTracker.firstGenerationEggsCount();
        require(eggCount <= _firstGenerationSize);
        if (eggCount < _airdroppedEggsLimit) {
            return 0;
        } else {
            require(eggCount > 0, "Linear pricing starts when airdrop is finished");
            uint256 _priceDelta = _eggsEndingPrice.sub(_eggsStartingPrice);
            uint256 _payableEggsCount = _firstGenerationSize.sub(_airdroppedEggsLimit);
            uint256 price = _eggsStartingPrice
                .add(_priceDelta.mul(eggCount).div(_payableEggsCount))
                .sub(_priceDelta.mul(_airdroppedEggsLimit).div(_payableEggsCount));
            return price;
        }
    }

    function breedingPrice() external view override returns (uint256) {
        return _breedingPrice;
    }

    function airdropFinished() external view override returns (bool) {
        uint256 eggCount = _generationTracker.firstGenerationEggsCount();
        return eggCount >= _airdroppedEggsLimit;
    }

    function _setGenerationTracker(address _tracker) internal {
        require(_tracker != address(0));
        require(_tracker.supportsInterface(type(IGenerationTracker).interfaceId), "GenerationTracker does not support IGenerationTracker interface");
        _generationTracker = IGenerationTracker(_tracker);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165StorageUpgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
