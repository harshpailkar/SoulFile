const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  const [deployer] = await ethers.getSigners()

  const SoulFile = await ethers.getContractFactory("SoulFile")
  const soulfile = await SoulFile.deploy()
  await soulfile.deployed()

  console.log("Deployed SoulFile Contract at: " + soulfile.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = soulfile;