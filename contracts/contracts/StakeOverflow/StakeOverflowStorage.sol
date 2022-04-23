//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "./Content.sol";

contract StakeOverflowStorage {
    uint256 _totalFee;

    // Enum
    enum QuestionStatus {
        NotExisted,
        Open,
        Closed
    }

    // Type
    struct Question {
        QuestionStatus status;
        address questioner;
        uint256 numAnswers;
        uint256 receivedQuestionerReward;
    }

    struct Answer {
        address answerer;
        uint256 questionID;
        uint256 nonce;
        uint256 receivedReward;
    }

    // Fields
    Content _content;
    mapping(uint256 => Question) public _questions;
    mapping(uint256 => Answer) public _answers;

    mapping(uint256 => mapping(address => uint256)) public _pooledAmount;
    mapping(uint256 => mapping(address => uint256)) public _rewardedAmount; // only pooled amount
}
