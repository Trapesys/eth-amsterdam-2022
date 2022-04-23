//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "./IStakeOverflow.sol";
import "./StakeOverflowStorage.sol";
import "./Content.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@openzeppelin/contracts/utils/math/SignedSafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakeOverflow is IStakeOverflow, StakeOverflowStorage, Ownable {
    // Constants
    uint256 STAKE_FEE_PCT = 5;
    uint256 INITIAL_EXIT_PENALTY_PCT = 0;
    uint256 SECOND_EXIT_PENALTY_PCT = 30;
    uint256 QUESTIONER_DIRECT_REWARD_PCT = 30;
    uint256 ANSWERER_DIRECT_REWARD_PCT = 70;

    // Events
    event NewQuestionAdded(
        address indexed questioner,
        uint256 questionID,
        string contentURI
    );

    event StakedToQuestion(
        uint256 indexed questionID,
        address indexed staker,
        uint256 amount
    );

    event NewAnswerAdded(
        uint256 indexed questionID,
        address indexed answerer,
        uint256 answerID,
        string contentURI
    );

    event Rewarded(
        uint256 indexed questionID,
        uint256 indexed answerID,
        address indexed sender,
        address questioner,
        address answerer,
        uint256 questionerReward,
        uint256 answererReward,
        uint256 reducedStake
    );

    event QuestionClosed(uint256 indexed questionID, uint256 reducedStake);

    constructor() {
        _content = new Content(address(this));
    }

    // Modifiers
    modifier onlyQuestionOpen(uint256 questionID) {
        require(
            _questions[questionID].status == QuestionStatus.Open,
            "Question is not open"
        );
        _;
    }

    modifier onlyQuestionExisted(uint256 questionID) {
        require(
            _questions[questionID].status != QuestionStatus.NotExisted,
            "Question does not exist"
        );
        _;
    }

    modifier onlyAnswerExisted(uint256 answerID) {
        require(
            _answers[answerID].answerer != address(0x0),
            "Answer does not exist"
        );
        _;
    }

    modifier onlyQuestioner(uint256 questionID) {
        require(
            _questions[questionID].questioner != msg.sender,
            "Only questioner can call"
        );
        _;
    }

    // Public Methods
    function getContentURI(uint256 contentID)
        public
        view
        returns (string memory)
    {
        return _content.tokenURI(contentID);
    }

    function withdrawFee() public onlyOwner {
        _totalFee = 0;
        payable(msg.sender).transfer(_totalFee);
    }

    function createQuestion(string memory ipfsContentHash)
        external
        payable
        override
    {
        require(msg.value > 0, "need value");

        _createQuestion(ipfsContentHash);
    }

    function stakeToQuestion(uint256 questionID)
        external
        payable
        override
        onlyQuestionOpen(questionID)
    {
        require(msg.value > 0, "need value");

        _stakeToQuestion(questionID, msg.sender, msg.value);
    }

    function createAnswer(uint256 questionID, string memory ipfsContentHash)
        external
        override
        onlyQuestionOpen(questionID)
    {
        _createAnswer(questionID, ipfsContentHash);
    }

    function rewardFromPool(uint256 questionID, uint256 answerID)
        external
        override
        onlyQuestionExisted(questionID)
        onlyAnswerExisted(answerID)
    {
        _rewardFromPool(questionID, answerID, msg.sender);
    }

    function rewardDirectly(uint256 questionID, uint256 answerID)
        external
        payable
        override
        onlyQuestionExisted(questionID)
        onlyAnswerExisted(answerID)
    {
        require(msg.value > 0, "need value");

        _rewardDirectly(questionID, answerID, msg.sender, msg.value);
    }

    function closeQuestion(uint256 questionID)
        external
        override
        onlyQuestioner(questionID)
        onlyQuestionOpen(questionID)
    {
        _closeQuestion(questionID);
    }

    // Private Methods
    function _createQuestion(string memory ipfsContentHash) private {
        address questioner = msg.sender;
        uint256 stakeAmount = msg.value;

        uint256 questionID = _content.newContent(questioner, ipfsContentHash);
        _questions[questionID] = Question({
            status: QuestionStatus.Open,
            questioner: questioner,
            numAnswers: 0,
            receivedQuestionerReward: 0
        });
        _stakeToQuestion(questionID, questioner, stakeAmount);

        string memory contentURI = _content.tokenURI(questionID);

        emit NewQuestionAdded(questioner, questionID, contentURI);
    }

    function _stakeToQuestion(
        uint256 questionID,
        address staker,
        uint256 amount
    ) private {
        Question storage question = _questions[questionID];
        uint256 poolAmount = (amount * (100 - STAKE_FEE_PCT)) / 100;
        uint256 fee = amount - poolAmount;

        _totalFee += fee;
        _pooledAmount[questionID][staker] += poolAmount;

        emit StakedToQuestion(questionID, staker, poolAmount);
    }

    function _createAnswer(uint256 questionID, string memory ipfsContentHash)
        private
    {
        address answerer = msg.sender;
        uint256 answerID = _content.newContent(answerer, ipfsContentHash);

        Question storage question = _questions[questionID];
        uint256 nonce = question.numAnswers;
        question.numAnswers += 1;

        _answers[answerID] = Answer({
            answerer: answerer,
            questionID: questionID,
            nonce: nonce,
            receivedReward: 0
        });

        string memory contentURI = _content.tokenURI(answerID);

        emit NewAnswerAdded(questionID, answerer, answerID, contentURI);
    }

    function _rewardFromPool(
        uint256 questionID,
        uint256 answerID,
        address staker
    ) private {
        Question storage question = _questions[questionID];
        Answer storage answer = _answers[answerID];

        uint256 pooledAmount = _pooledAmount[questionID][staker];
        uint256 rewardedAmount = _rewardedAmount[questionID][staker];
        uint256 newReward = pooledAmount - rewardedAmount;

        require(newReward > 0, "No available amount");

        _pooledAmount[questionID][staker] = 0;
        _rewardedAmount[questionID][staker] += newReward;
        answer.receivedReward += newReward;

        payable(answer.answerer).transfer(newReward);

        emit Rewarded(
            questionID,
            answerID,
            staker,
            question.questioner,
            answer.answerer,
            0,
            newReward,
            newReward
        );
    }

    function _rewardDirectly(
        uint256 questionID,
        uint256 answerID,
        address staker,
        uint256 amount
    ) private {
        Question storage question = _questions[questionID];
        Answer memory answer = _answers[answerID];

        uint256 rewardAmount = (amount * (100 - STAKE_FEE_PCT)) / 100;
        uint256 fee = amount - rewardAmount;

        uint256 rewardForQuestioner = (rewardAmount *
            QUESTIONER_DIRECT_REWARD_PCT) / 100;
        uint256 rewardForAnswerer = rewardAmount - rewardForQuestioner;

        _totalFee += fee;
        question.receivedQuestionerReward += rewardForQuestioner;
        answer.receivedReward += rewardForAnswerer;

        payable(question.questioner).transfer(rewardForQuestioner);
        payable(answer.answerer).transfer(rewardForAnswerer);

        emit Rewarded(
            questionID,
            answerID,
            staker,
            question.questioner,
            answer.answerer,
            rewardForQuestioner,
            rewardForAnswerer,
            0
        );
    }

    function _closeQuestion(uint256 questionID) private {
        Question storage question = _questions[questionID];
        question.status = QuestionStatus.Closed;

        address questioner = question.questioner;
        uint256 pooledAmount = _pooledAmount[questionID][questioner];

        if (pooledAmount > 0) {
            uint256 refund = 0;
            uint256 panalty = 0;

            if (question.numAnswers == 0) {
                // no penalty in case of no question
                refund = pooledAmount;
            } else {
                panalty = (pooledAmount * SECOND_EXIT_PENALTY_PCT) / 100;
                refund = pooledAmount - panalty;
            }

            _totalFee += panalty;
            payable(questioner).transfer(pooledAmount);
        }

        _pooledAmount[questionID][questioner] = 0;

        emit QuestionClosed(questionID, pooledAmount);
    }
}
