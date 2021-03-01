import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import cakeABI from 'config/abi/cake.json'
import wbnbABI from 'config/abi/weth.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getAddress, getWbnbAddress, getSousChefAddress } from 'utils/addressHelpers'
import { usePriceCakeBusd } from 'state/hooks'
import BigNumber from 'bignumber.js'

export const fetchPoolsBlockLimits = async () => {
  // const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const poolsWithEnd = poolsConfig
  // console.log(poolsWithEnd)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'bonusEndBlock',
    }
  })

  // console.log(callsEndBlock)

  const starts = await multicall(sousChefABI, callsStartBlock)
  // const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startBlock = starts[index]
    // const endBlock = ends[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(2677834).toJSON(),
    }
  })
}

export const fetchPoolsTotalStatking = async () => {
  const nonBnbPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.BNB)
  const bnbPool = poolsConfig.filter((p) => p.stakingTokenName === QuoteToken.BNB)

  const callsNonBnbPools = nonBnbPools.map((poolConfig) => {
    return {
      address: poolConfig.stakingTokenAddress,
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsBnbPools = bnbPool.map((poolConfig) => {
    return {
      address: getWbnbAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const nonBnbPoolsTotalStaked = await multicall(cakeABI, callsNonBnbPools)
  const bnbPoolsTotalStaked = await multicall(wbnbABI, callsBnbPools)

  return [
    ...nonBnbPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonBnbPoolsTotalStaked[index]).toJSON(),
    })),
    ...bnbPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(bnbPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchTotalPoolsPoint = async () => {
  const poolsWithEnd = poolsConfig
  const [totalAllPoint] = await multicall(sousChefABI, [{
    address: getSousChefAddress(),
    name: "totalAllocPoint"
  }])
  const point = new BigNumber(totalAllPoint[0]._hex)
  return point
  
}
export const fetchSinglePoolsPoint = async(sousId) => {
  // console.log(sousId)
  const res = await multicall(sousChefABI, [{
    address: getSousChefAddress(),
    name: "poolInfo",
    params: [sousId]
  }])
  const point = new BigNumber(res[0].allocPoint._hex)
  return point
}
export const fetchPoolApy = async(pool, cakePriceUsd) => {
  const singleChefTotalAmount = 24 * 3600 / 3 * 0.6
  const singlePoolsPoint = await fetchSinglePoolsPoint(pool.sousId)
  const totalPoolsPoint = await fetchTotalPoolsPoint()
  let tokenPrice
  if (pool.tokenName === 'MX') {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=mx-token&vs_currencies=usd`)
    const _priceData = await res.json()
    tokenPrice = _priceData['mx-token'].usd
  } else if (pool.tokenName === 'HT') {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=huobi-token&vs_currencies=usd`)
    const _priceData = await res.json()
    tokenPrice = _priceData['huobi-token'].usd
  } else if (pool.tokenName === 'PURE') {
    tokenPrice = cakePriceUsd.toNumber()
    // tokenPrice = useSingleTokenPrive('PURE-token')
  }
  let apr
  // 池子每日产出
  const poolOutput = singlePoolsPoint.toNumber() / totalPoolsPoint.toNumber() * singleChefTotalAmount
  // 质押量
  const poolTvl = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18)).toNumber()
  
  if (pool.sousId === 0) {
    apr = new BigNumber(poolOutput / poolTvl * 100)
  } else if (pool.sousId === 1) {
    console.log((poolTvl * tokenPrice))
    if (!Number.isNaN(poolTvl * tokenPrice)) {
      apr = new BigNumber((poolOutput * cakePriceUsd) / (poolTvl * tokenPrice) * 100)
    }
  }
  return apr
}