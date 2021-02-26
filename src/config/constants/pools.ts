import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'usdc',
    stakingTokenName: QuoteToken.usdc,
    stakingTokenAddress: '0xd459Dad367788893c17c09e17cFBF0bf25c62833',
    contractAddress: {
      256: '0xF782ce8E9F8373bB933029807E9EC15E362FC6aF',
      128: '0xF782ce8E9F8373bB933029807E9EC15E362FC6aF',
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
    tokenName: 'dai',
    stakingTokenName: QuoteToken.dai,
    stakingTokenAddress: '0x60d64Ef311a4F0E288120543A14e7f90E76304c6',
    contractAddress: {
      256: '0xF782ce8E9F8373bB933029807E9EC15E362FC6aF',
      128: '0xF782ce8E9F8373bB933029807E9EC15E362FC6aF',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://pureswap.finance/',
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
  // {
  //   sousId: 2,
  //   tokenName: 'snx',
  //   stakingTokenName: QuoteToken.snx,
  //   stakingTokenAddress: '0x087Ed0d3CA0Ed342AD4Ad3439F8174b41e2Ba47D',
  //   contractAddress: {
  //     256: '0xF782ce8E9F8373bB933029807E9EC15E362FC6aF',
  //     128: '0xF782ce8E9F8373bB933029807E9EC15E362FC6aF',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   projectLink: 'https://pureswap.finance/',
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 1,
  //   isFinished: false,
  //   tokenDecimals: 18,
  // }
]

export default pools
