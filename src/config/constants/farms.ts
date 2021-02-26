import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  // {
  //   pid: 0,
  //   lpSymbol: 'Pure',
  //   lpAddresses: {
  //     256: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
  //     128: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   tokenSymbol: 'SYRUP',
  //   tokenAddresses: {
  //     256: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  //     128: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  {
    pid: 1,
    lpSymbol: 'dai-snx LP',
    lpAddresses: {
      256: '0xDD9DD3873A56F3105aa8a8DaF2c922A158EB1108',
      128: '0xDD9DD3873A56F3105aa8a8DaF2c922A158EB1108',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      256: '0xDD9DD3873A56F3105aa8a8DaF2c922A158EB1108',
      128: '0xDD9DD3873A56F3105aa8a8DaF2c922A158EB1108',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'dai-heth LP',
    lpAddresses: {
      256: '0x46a32F4066Bf926806B56f7f38f3051Cc80e2Be2',
      128: '0x46a32F4066Bf926806B56f7f38f3051Cc80e2Be2',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      256: '0x46a32F4066Bf926806B56f7f38f3051Cc80e2Be2',
      128: '0x46a32F4066Bf926806B56f7f38f3051Cc80e2Be2',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  }
]

export default farms
