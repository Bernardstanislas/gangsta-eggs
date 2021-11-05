// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IGangstaChicks {
    function mintChickFromEgg(address _to, string calldata _ipfsCid) external returns (bool);
}
