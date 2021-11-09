// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "../interfaces/IPricer.sol";

contract Pricer is IPricer, Initializable, AccessControlUpgradeable  {
    uint256 private _airdroppedEggsLimit;
    uint256 private _eggsStartingPrice;
    uint256 private _eggsEndingPrice;
    uint256 private _firstGenerationEggsCount;
    uint256 private _breedingPrice;
    
    bytes32 public constant CFO_ROLE = keccak256("CFO_ROLE");

    function initialize() initializer public {
        __AccessControl_init();

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CFO_ROLE, msg.sender);
        _airdroppedEggsLimit = 200;
        _eggsStartingPrice = 0.015 ether;
        _eggsEndingPrice = 0.06 ether;
        _firstGenerationEggsCount = 4444;
        _breedingPrice = 0.02 ether;
    }

    function setAirdroppedEggsLimit(uint256 _limit) public onlyRole(CFO_ROLE) {
        require(_airdroppedEggsLimit > 0);
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

    function setFirstGenerationEggsCount(uint256 _count) public onlyRole(CFO_ROLE) {
        require(_count > 0);
        _firstGenerationEggsCount = _count;
    }

    function setBreedingPrice(uint256 _price) public onlyRole(CFO_ROLE) {
        require(_price > 0);
        _breedingPrice = _price;
    }

    function mintingPrice() external view override returns (uint256) {
        return 0;
    }

    function breedingPrice() external view override returns (uint256) {
        return _breedingPrice;
    }
}
