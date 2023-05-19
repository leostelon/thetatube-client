// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "ThetaTube.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Factory {
    address[] public nfts;
    uint256 public nftsCount;
    mapping(address => address) public owner; // First address -> Token Address, Second address -> Creator
    mapping(address => uint256) public price;

    event TokenDeployed(address indexed tokenAddress);
    
    function createToken(
        string calldata _name,
        string calldata _ticker,
        uint256 _price,
        address creator
    ) public returns (address) {
        ThetaTube nft = new ThetaTube(_name, _ticker, _price, creator);
        nfts.push(address(nft));

        nftsCount += 1;
        owner[address(nft)] = msg.sender;
        price[address(nft)] = _price;

        emit TokenDeployed(address(nft));
        return address(nft);
    }
}
