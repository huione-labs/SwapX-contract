# uniswapV2_deployer

## deploy Prepare
### pull runtime dependencies
```shell
npm i

npx hardhat compile
```

### parameter configuration
modify hardhat.config.ts
```javascript
  // default execution network environment
  defaultNetwork: "hardhat",
  networks: {
    "hardhat": {},
    // custom network configuration
    // network name
    "polygonMumbai": {
      // rpc endpoint
      url: "https://rpc.ankr.com/polygon_mumbai",
      // account private key (hex)
      accounts: ["<privateKey>"]
    }
  }
```

### deploy
console execution command
```shell
npx hardhat run ./scripts/01_deploy_univ2.ts --network <network name>
```
after the console executes the command, the program will start to deploy and output a deployed contract address.

```shell
deployed Uniswap_V2 Factory addr:  0xd6f2aE88c233c055a713E84BbAd5D263C3F2881e
INIT_CODE_HASH:  0x6af889c499e5d9b9902c6c9af64cdeba8064673055d15ee43238c2764c92dc62
```

Use the printed factory address and INIT_CODE_HASH，Modify the INIT_CODE_HASH constant in libraray
```
contracts/v2-periphery/contracts/libraries/UniswapV2Library.sol:line:24

function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'6af889c499e5d9b9902c6c9af64cdeba8064673055d15ee43238c2764c92dc62' // init code hash
            ))));
}

```




#### deployment considerations
need to deploy a new WXOC9 contract, you need to comment the code in lines 10 in 02_deploy_router.ts and assign the specified contract address to the *wxoc9_addr* variable.
```typescript
    // replace address
    var wxoc9_addr = "0x33785384c3AE70167F291502A0f26392d1CF18E6";
    var factory_addr = "0x0790F47c8bB3d07adAb53002606AC4B7638a5968";
```

```shell
npx hardhat run ./scripts/02_deploy_router.ts --network <network name>
```
