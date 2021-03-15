import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'PURE-BTCB LP',
    lpAddresses: {
      56: '0x0eB92a693edBcBd3ED2B50B58AfD02204faE3E15',
      97: '0x0eB92a693edBcBd3ED2B50B58AfD02204faE3E15',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      56: '0x9CB09Ee4bCD56d1C622F93297FFEf9c976651263',
      97: '0x9CB09Ee4bCD56d1C622F93297FFEf9c976651263',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 1,
    lpSymbol: 'PURE-BUSD LP',
    lpAddresses: {
      56: '0x8b5E7Cf32b5b35be9e46De82f77E204868bABa4A',
      97: '0x8b5E7Cf32b5b35be9e46De82f77E204868bABa4A',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      56: '0x9CB09Ee4bCD56d1C622F93297FFEf9c976651263',
      97: '0x9CB09Ee4bCD56d1C622F93297FFEf9c976651263',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 2,
    lpSymbol: 'PURE-USDT LP',
    lpAddresses: {
      56: '0xec6c16EDeb5F62d9bb8dd03d094355dbcfD4BB04',
      97: '0xec6c16EDeb5F62d9bb8dd03d094355dbcfD4BB04',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      56: '0x9CB09Ee4bCD56d1C622F93297FFEf9c976651263',
      97: '0x9CB09Ee4bCD56d1C622F93297FFEf9c976651263',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 3,
    lpSymbol: 'PURE-BNB LP',
    lpAddresses: {
      56: '0xC37Ac6b016E49c5F415f1D4e0e188A5067D0Bf5d',
      97: '0xC37Ac6b016E49c5F415f1D4e0e188A5067D0Bf5d',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      56: '0x9CB09Ee4bCD56d1C622F93297FFEf9c976651263',
      97: '0x9CB09Ee4bCD56d1C622F93297FFEf9c976651263',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      56: '0x6083f3fcB025AE960B494555E5b871dE963F25Ba',
      97: '0x6083f3fcB025AE960B494555E5b871dE963F25Ba',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      56: '0xB2e59F7bA3Be8E72a2324Dc39D4f4896daa42365',
      97: '0xB2e59F7bA3Be8E72a2324Dc39D4f4896daa42365',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  }

  // {
  //   pid: 0,
  //   lpSymbol: 'Pure',
  //   lpAddresses: {
  //     56: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
  //     97: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   tokenSymbol: 'SYRUP',
  //   tokenAddresses: {
  //     56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  //     97: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
]

export default farms
