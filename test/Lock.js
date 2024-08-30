require("dotenv").config();
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber, constants } = require('ethers');

describe("Cats Contract Tests", function () {
  let catContract;
  let baseURI = "ipfs://QmSdA8FbgDLQEF65mzepFoKf79Scrti9EcejkJh2oc5fkN";
  let owner, user1, user2, user3;

  it("should deploy contract, mint tokens, and get token URI", async function () {
    // Deploy contract
    [owner, user1, user2, user3] = await ethers.getSigners();
    const Cat = await ethers.getContractFactory("Cats");
    catContract = await Cat.deploy();
    await catContract.waitForDeployment();
    console.log("Cat contract deployed to:", await catContract.getAddress());

    // Mint tokens individually
    await catContract.connect(owner).mint(user1.address, 1, 2, "0x");
    await catContract.connect(owner).mint(user2.address, 3, 1, "0x");

    const balanceUser1 = await catContract.balanceOf(user1.address, 1);
    const balanceUser2 = await catContract.balanceOf(user2.address, 3);

    expect(balanceUser1).to.equal(2);
    expect(balanceUser2).to.equal(1);

    // Mint tokens in batch
    await catContract.connect(owner).mintBatch(user1.address, [2, 4, 5], [1, 2, 1], "0x");

    const balanceUser1Token2 = await catContract.balanceOf(user1.address, 2);
    const balanceUser1Token4 = await catContract.balanceOf(user1.address, 4);
    const balanceUser1Token5 = await catContract.balanceOf(user1.address, 5);

    expect(balanceUser1Token2).to.equal(1);
    expect(balanceUser1Token4).to.equal(2);
    expect(balanceUser1Token5).to.equal(1);

    // Set and get token URI
    await catContract.setTokenUri(1, baseURI + "/1.json");
    const tokenUri = await catContract.getTokenUri(1);

    console.log("Token URI for token 1:", tokenUri);
    expect(tokenUri).to.equal(baseURI + "/1.json");
  });
});
