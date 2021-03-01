import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'PURE-HBTC LP',
    lpAddresses: {
      256: '0xfC0824bad68AA0A5E5e4b4c3736719261f8a43E2',
      128: '0xfC0824bad68AA0A5E5e4b4c3736719261f8a43E2',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      256: '0x941bA89b5b06cfC1a6e3f378C392E2b72B598089',
      128: '0x941bA89b5b06cfC1a6e3f378C392E2b72B598089',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'PURE-USDT LP',
    lpAddresses: {
      256: '0x3abdF262E3100A2612d5276A985107DB087B879c',
      128: '0x3abdF262E3100A2612d5276A985107DB087B879c',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      256: '0x941bA89b5b06cfC1a6e3f378C392E2b72B598089',
      128: '0x941bA89b5b06cfC1a6e3f378C392E2b72B598089',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'PURE-HUSD LP',
    lpAddresses: {
      256: '0x93F7f9f2D81eDf77449981aE3dEb122BA6DecC39',
      128: '0x93F7f9f2D81eDf77449981aE3dEb122BA6DecC39',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      256: '0x941bA89b5b06cfC1a6e3f378C392E2b72B598089',
      128: '0x941bA89b5b06cfC1a6e3f378C392E2b72B598089',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'PURE-HT LP',
    lpAddresses: {
      256: '0x441186d715d845ae8aDb031457EC9B3D26D94459',
      128: '0x441186d715d845ae8aDb031457EC9B3D26D94459',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      256: '0x941bA89b5b06cfC1a6e3f378C392E2b72B598089',
      128: '0x941bA89b5b06cfC1a6e3f378C392E2b72B598089',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'HT-HUSD LP',
    lpAddresses: {
      256: '0xaD90469F43150293134cB1d5Fea69Cf3571CBD80',
      128: '0xaD90469F43150293134cB1d5Fea69Cf3571CBD80',
    },
    tokenSymbol: 'HT',
    tokenAddresses: {
      256: '0x7af326b6351c8a9b8fb8cd205cbe11d4ac5fa836',
      128: '0x7af326b6351c8a9b8fb8cd205cbe11d4ac5fa836',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  }

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
]

export default farms
