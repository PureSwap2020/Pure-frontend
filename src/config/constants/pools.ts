import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'PURE',
    stakingTokenName: QuoteToken.PURE,
    stakingTokenAddress: '0x941bA89b5b06cfC1a6e3f378C392E2b72B598089',
    contractAddress: {
      256: '0xC8804b2B1899F402bCddadA124cc3987F141C7B0',
      128: '0xC8804b2B1899F402bCddadA124cc3987F141C7B0',
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
    stakingTokenAddress: '0x966a2cCe17F5E8EEfc38d92576aFC26D936503a8',
    contractAddress: {
      256: '0xC8804b2B1899F402bCddadA124cc3987F141C7B0',
      128: '0xC8804b2B1899F402bCddadA124cc3987F141C7B0',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://pureswap.finance/',
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 2,
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
