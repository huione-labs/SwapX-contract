import { artifacts, ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { common } from "./common";

async function main() {
    const [deployer] = await ethers.getSigners();

    const uniV2Factory = await deploy_UniV2Factory(deployer);
    console.log("deployed Uniswap_V2 Factory addr: ", uniV2Factory.address);
    // thread sleep 1.5s, to get last nonce number
    await delay(1500);

    const INIT_CODE_HASH = await uniV2Factory.INIT_CODE_PAIR_HASH();
    console.log("INIT_CODE_HASH: ", INIT_CODE_HASH);
}

async function deploy_UniV2Factory(deployer: SignerWithAddress) {
    const univ3_factory = await ethers.getContractFactory("contracts/v2-core/contracts/UniswapV2Factory.sol:UniswapV2Factory", deployer)

    return await univ3_factory.deploy(deployer.address);
}




function delay(timeInMillis: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});