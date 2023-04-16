const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  const [deployer] = await ethers.getSigners()
  const NAME = "SoulFile"
  const SYMBOL = "SFL"

  const SoulFile = await ethers.getContractFactory("SoulFile")
  const soulfile = await SoulFile.deploy(NAME, SYMBOL)
  await soulfile.deplyed()

  console.log("Deployed Dappcord Contract at: " + soulfile.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});