import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import {
  compileSetting,
} from "./scripts/common";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [compileSetting("0.5.0", 200), compileSetting("0.5.16", 200), compileSetting("0.6.6", 200)],
    overrides: {
      // "contracts/WXOC9.sol": compileSetting("0.4.22", 200),
      "contracts/v2-core/contracts/UniswapV2Factory.sol": compileSetting("0.5.16", 200),
      "contracts/v2-periphery/contracts/UniswapV2Router02.sol": compileSetting("0.6.6", 200),
      "contracts/v2-periphery/contracts/UniswapV2Migrator.sol": compileSetting("0.6.6", 200),
    },
  },
  paths: {
    sources: "./contracts"
  },

  defaultNetwork: "hardhat",
  networks: {
    "hardhat": {},
    "xone-test": {
      url: "https://rpc-testnet.xone.plus/",
      accounts: ["d061563918d9d4b158975407b2c828429524931ece96e641396daf7e84c7e5dc"]
    }
  }
};

export default config;
