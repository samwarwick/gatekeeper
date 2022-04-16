import { HardhatUserConfig } from "hardhat/config";
import "hardhat-gas-reporter";
import "@typechain/hardhat";
//https://hardhat.org/guides/waffle-testing.html
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";

const hardhatConfig: HardhatUserConfig = {
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000,
      },
    },
  },
};

export default hardhatConfig;
