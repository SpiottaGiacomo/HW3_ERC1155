// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Cats is ERC1155Supply, Ownable {

    uint256 public constant NFT1 = 1;
    uint256 public constant NFT2 = 2;
    uint256 public constant NFT3 = 3;
    uint256 public constant NFT4 = 4;
    uint256 public constant NFT5 = 5;
    uint256 public constant NFT6 = 6;

    //tokenId => tokenUri
    mapping(uint256 => string) public _uris;

    constructor() ERC1155("ipfs://QmSdA8FbgDLQEF65mzepFoKf79Scrti9EcejkJh2oc5fkN/{id}.json") Ownable() {

    }

    function mint(address to, uint256 id, uint256 value, bytes memory data) external onlyOwner{
        _mint(to,id,value,data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory values, bytes memory data) external onlyOwner{
        _mintBatch(to, ids, values, data);
    }

    function setTokenUri(uint256 tokenId, string calldata tokenUri) external onlyOwner{
        _uris[tokenId] = tokenUri;
    }

    function getTokenUri(uint256 tokenId) external view returns (string memory){
        return _uris[tokenId];
    }
}
