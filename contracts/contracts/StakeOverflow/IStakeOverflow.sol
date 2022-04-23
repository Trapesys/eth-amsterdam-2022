//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

interface IStakeOverflow {
    function createQuestion(
        string memory ipfsContentHash,
        string memory title,
        string[] memory tags
    ) external payable;

    function stakeToQuestion(uint256 questionID) external payable;

    function createAnswer(uint256 questionID, string memory ipfsContentHash)
        external;

    function rewardFromPool(uint256 questionID, uint256 answerID) external;

    function rewardDirectly(uint256 questionID, uint256 answerID)
        external
        payable;

    function closeQuestion(uint256 questionID) external;
}
