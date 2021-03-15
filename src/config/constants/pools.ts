import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'PURE',
    stakingTokenName: QuoteToken.PURE,
    stakingTokenAddress: '0x9CB09Ee4bCD56d1C622F93297FFEf9c976651263',
    contractAddress: {
      56: '0x16229E8eF267F24De35d177c968A854c4efcbdB4',
      97: '0x16229E8eF267F24De35d177c968A854c4efcbdB4',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://pureswap.finance/',
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
  {
    sousId: 1,
    tokenName: 'MX',
    stakingTokenName: QuoteToken.MX,
    stakingTokenAddress: '0x920084a10f03DA45Cfd98fd2a388575c934DaEeA',
    contractAddress: {
      56: '0x16229E8eF267F24De35d177c968A854c4efcbdB4',
      97: '0x16229E8eF267F24De35d177c968A854c4efcbdB4',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://pureswap.finance/',
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 2,
    isFinished: false,
    tokenDecimals: 18,
    getPriceTokenSymbol: 'mx-token',
  },
]

export default pools
