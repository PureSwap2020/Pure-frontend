import { toWei } from 'web3-utils'
import { Ifo } from './types'
import SrarterV3 from '../abi/StarterV3.json'

const ifos: Ifo[] = [
  {
    name: 'TEST',
    abi: SrarterV3,
    address: '0x389cEf08D83E72C574cb91E9E16b84C71169B57A',
    type: 0,
    startAt: '1623052800',
    time: '1623072600',
    timeClose: '0',
    currency: {
      isToken: true,
      address: '0xE079424a4Fef5c547478a85802B462E4699b0fa9', // pure-bnb
      decimal: 18,
      symbol: 'PURE-BNB',
    },
    underlying: {
      address: '0x55d398326f99059fF775485246999027B3197955', // usdt
      decimal: 18,
      symbol: 'USDT',
      name: 'USDT',
      totalSupply: '400,000,000.00',
    },
    ratio: '1USDT=0.02PURE-BNB',
    progress: 0,
    amount: '1',
    purchasedCurrencyOf: '0',
    totalPurchasedAmount: toWei('50'),
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',
    status: 0,
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
