//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Content is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIDs;

    constructor(address owner) ERC721("StakeOverflowContent", "SOC") {
        _transferOwnership(owner);
    }

    function newContent(address recipient, string memory contentHash)
        public
        onlyOwner
        returns (uint256)
    {
        return _newContent(recipient, contentHash);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override onlyOwner {}

    function _newContent(address recipient, string memory ipfsContentHash)
        private
        returns (uint256)
    {
        _tokenIDs.increment();
        uint256 newContentID = _tokenIDs.current();

        _mint(recipient, newContentID);
        _setTokenURI(
            newContentID,
            string(abi.encodePacked("https://ipfs.io/ipfs/", ipfsContentHash))
        );

        return newContentID;
    }

    function _burn(uint256 tokenID) internal override {
        revert("Can't burn content");
    }
}
