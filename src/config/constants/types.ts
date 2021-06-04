import { TranslatableText } from 'state/types'

export type IfoStatus = 'coming_soon' | 'live' | 'finished'

export interface Currency {
  address: string,
  decimal: number,
  symbol: string
}

export interface Underlying {
  name: string,
  address: string,
  decimal: number,
  symbol: string,
  totalSupply: string,
}

export interface Ifo {
  name: string
  address: string,
  type: number
  abi: Array<any>,
  startAt: string,
  time: string,
  currency: Currency,
  underlying: Underlying,
  ratio: string,
  progress: number,
  amount: string,
  purchasedCurrencyOf: string,
  totalPurchasedAmount: string,
  totalPurchasedUnderlying: string,
  totalPurchasedCurrency: string,
  status: number,
  website: string,
  whitePaper: string,
  twitter: string,
  telegram: string,
  github: string,
  yuque: string,
  linkUrl: string,
}

export enum QuoteToken {
  'BNB' = 'BNB',
  'CAKE' = 'CAKE',
  'SYRUP' = 'SYRUP',
  'BUSD' = 'BUSD',
  'TWT' = 'TWT',
  'UST' = 'UST',
  'ETH' = 'ETH',
  'COMP' = 'COMP',
  'usdc' = 'usdc',
  'dai' = 'dai',
  'snx' = 'snx',
  'PURE' = 'PURE',
  'HT' = 'HT',
  'MX' = 'MX',
  'BTCB' = 'BTCB',
  'WBNB' = 'WBNB'
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  56?: string
  97: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  multiplier?: string
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  stakingTokenName: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: string
  contractAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
  getPriceTokenSymbol?: string
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type Nft = {
  name: string
  description: string
  images: NftImages
  sortOrder: number
  bunnyId: number
  video?: NftVideo
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type CampaignType = 'ifo'

export type Campaign = {
  id: string
  type: CampaignType
  title?: TranslatableText
  description?: TranslatableText
  badge?: string
}
