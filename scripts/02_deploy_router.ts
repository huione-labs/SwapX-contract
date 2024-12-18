import { artifacts, ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { common } from "./common";

async function main() {
    const [deployer] = await ethers.getSigners();

    var wxoc9_addr = "0x5146B1FB7389C8b7253a04BC24895C68cAF30ed9";
    var factory_addr = "0xF75d30dD587b0616698912aA1E3608fBc8ea852a";

    const uniV2Router02 = await deploy_UniV2Router02(deployer, factory_addr, wxoc9_addr)
    console.log("deployed Uniswap_V2 Router02 addr: ", uniV2Router02.address);
}


async function deploy_UniV2Router02(deployer:SignerWithAddress, factory: string, wxoc9 : string) {
    const multicall2_factory = await ethers.getContractFactory("contracts/v2-periphery/contracts/UniswapV2Router02.sol:UniswapV2Router02", deployer);

    return await multicall2_factory.deploy(factory, wxoc9);
}


function delay(timeInMillis: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});