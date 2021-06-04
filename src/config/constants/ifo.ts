import { Ifo } from './types'
import SrarterV3 from '../abi/StarterV3.json'

const ifos: Ifo[] = [
  {
    name: 'dFuture',
    abi: SrarterV3,
    address: '0xd9019793189E12ac91892b4D4622E3A315a289Fc',
    type: 0,
    startAt: '1614690000',
    time: '1614693600',
    currency: {
      address: '0xa71edc38d189767582c38a3145b5873052c3e47a', // 如果是0x0则是ht
      decimal: 18,
      symbol: 'USDT',
    },
    underlying: {
      address: '0x42712dF5009c20fee340B245b510c0395896cF6e',
      decimal: 18,
      symbol: 'DFT',
      name: 'dFuture',
      totalSupply: '400,000,000.00'
    },
    ratio: '1DFT=0.3USDT',
    progress: 1038.92,
    amount: '166667',
    purchasedCurrencyOf: '0',
    totalPurchasedAmount: '50000000000000000000000',
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',
    status: 3,
    website: 'https://www.dfuture.com',
    whitePaper: '',
    twitter: 'https://twitter.com/dFuture_finance',
    telegram: 'https://t.me/dfutureglobal',
    github: '',
    yuque: '',
    linkUrl: 'https://heco.dfuture.com/home',
  },
]

export default ifos
