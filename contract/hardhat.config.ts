require('dotenv').config()

import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    chiliz: {
      chainId: 88882,
      url: "https://spicy-rpc.chiliz.com",
      accounts: [process.env.SERVER_KEY || ""]
    }
  }
};

export default config;
