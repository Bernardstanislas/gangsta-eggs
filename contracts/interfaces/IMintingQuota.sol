// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IMintingQuota {
  function safeRegisterMinting(address _to) external;

  function remainingMinting(address _to) external view returns (uint256);

  function mintingLimitReached() external view returns (bool);
}
