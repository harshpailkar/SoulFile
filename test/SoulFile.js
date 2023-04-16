const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SoulFile", function () {
  let soulFile;
  let owner;
  let addr1;
  let addr2;
  let uri = "QmbJ4nQRNxbKYqmPRKWv1U7VuoAk55X4SU6g1GWGEYqVab";

  beforeEach(async function () {
    const SoulFile = await ethers.getContractFactory("SoulFile");
    [owner, addr1, addr2] = await ethers.getSigners();
    soulFile = await SoulFile.deploy();
    await soulFile.deployed();
  });

  it("Should mint a new token", async function () {
    await soulFile.safeMint(addr1.address, uri);
    expect(await soulFile.ownerOf(0)).to.equal(addr1.address);
    expect(await soulFile.tokenURI(0)).to.equal(uri);
  });

  it("Should not allow transfer of token", async function () {
    await soulFile.safeMint(addr1.address, uri);
    await expect(soulFile.transferFrom(addr1.address, addr2.address, 0)).to.be.revertedWith("Not allowed to transfer token");
  });

  it("Should burn a token", async function () {
    await soulFile.safeMint(addr1.address, uri);
    await soulFile.burn(0);
    await expect(soulFile.ownerOf(0)).to.be.revertedWith("ERC721: owner query for nonexistent token");
  });

  it("Should revoke a token", async function () {
    await soulFile.safeMint(addr1.address, uri);
    await soulFile.revoke(0);
    await expect(soulFile.ownerOf(0)).to.be.revertedWith("ERC721: owner query for nonexistent token");
  });

  it("Should emit Attest event when a new token is minted", async function () {
    await expect(soulFile.safeMint(addr1.address, uri))
      .to.emit(soulFile, "Attest")
      .withArgs(addr1.address, 0);
  });

  it("Should emit Revoke event when a token is revoked", async function () {
    await soulFile.safeMint(addr1.address, uri);
    await expect(soulFile.revoke(0))
      .to.emit(soulFile, "Revoke")
      .withArgs(ethers.constants.AddressZero, 0);
  });
});
