import React, { useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarms, usePriceBnbBusd, usePools, usePriceEthBnb, usePriceCakeBusd } from 'state/hooks'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { fetchTotalPoolsPoint, fetchSinglePoolsPoint, fetchPoolApy } from 'state/pools/fetchPools';
// import { useSingleTokenPrive } from 'hooks/api'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'

const CardImage = styled.img`
  margin-bottom: 16px;
  position: absolute;
  right: 0;
`

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWallet()
  const farms = useFarms()
  const pools = usePools(account)
  const bnbPriceUSD = usePriceBnbBusd()
  const ethPriceBnb = usePriceEthBnb()
  const block = useBlock()
  const [stackedOnly, setStackedOnly] = useState(false)
  
  const cakePriceUsd = usePriceCakeBusd()

  // const totalPoolsPoint = fetchTotalPoolsPoint()
  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'BNB') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.BUSD) {
      return tokenPriceBN.div(bnbPriceUSD)
    }
    return tokenPriceBN
  }
  const getApy = (pool) => {
    fetchPoolApy(pool, cakePriceUsd).then(res => {
      window.localStorage.setItem(`poolApy${pool.sousId}`, res)
    })
  }
  const poolsWithApy = pools.map((pool, i) => {
    // const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    // const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    // const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)
    // /!\ Assume that the farm quote price is BNB
    // const stakingTokenPriceInBNB = isBnbPool
    //   ? new BigNumber(1)
    //   : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote).times(1)
    // const rewardTokenPriceInBNB = priceToBnb(
    //   pool.tokenName,
    //   rewardTokenFarm?.tokenPriceVsQuote,
    //   rewardTokenFarm?.quoteTokenSymbol,
    // )
    // const totalRewardPricePerYear = rewardTokenPriceInBNB.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    // const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked))
    getApy(pool)
    const apy = new BigNumber(window.localStorage.getItem(`poolApy${pool.sousId}`))// totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
    }
  })
  // console.log(pool)
  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)
  const stackedOnlyPools = openPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )
  // console.log(openPools)
  return (
    <Page>
      {/* <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            {TranslateString(738, 'Syrup Pool')}
          </Heading>
          <ul>
            <li>{TranslateString(580, 'Stake PURE to earn new tokens.')}</li>
            <li>{TranslateString(486, 'You can unstake at any time.')}</li>
            <li>{TranslateString(406, 'Rewards are calculated per block.')}</li>
          </ul>
        </div>
        <CardImage src="/images//home_header_bg.png" alt="cake logo" width={800} />
        <PoolTabButtons stackedOnly={stackedOnly} setStackedOnly={setStackedOnly} />
      </Hero> */}
      <Hero>
        <div>
          <Heading as="h1" size="xl" mb="16px">
            {TranslateString(738, 'Pool')}
          </Heading>
          <ul>
            <li style={{ color: '#85898c' }}>{TranslateString(580, 'Stake PURE to earn new tokens.')}{TranslateString(486, 'You can unstake at any time.')}</li>
            <li style={{ color: '#85898c' }}>{TranslateString(406, 'Rewards are calculated per block.')}</li>
          </ul>
        </div>
        {/* <CardImage src="/images//home_header_bg.png" alt="cake logo" width={800} /> */}
      </Hero>
      {/* <PoolTabButtons stackedOnly={stackedOnly} setStackedOnly={setStackedOnly} /> */}
      {/* <Divider /> */}
      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {stackedOnly
              ? orderBy(stackedOnlyPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)
              : orderBy(openPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)}
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route>
      </FlexLayout>
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 24px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`
// console.log(useSingleTokenPrive)
// console.log(farms)
// const poolsD = pools.map(async (pool) => {
//   // console.log(pool)
//   let tokenPrice
//   if (pool.tokenName === 'MX') {
//     const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=mx-token&vs_currencies=usd`)
//     const _priceData = await res.json()
//     tokenPrice = _priceData['mx-token'].usd
//   } else if (pool.tokenName === 'HT') {
//     const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=huobi-token&vs_currencies=usd`)
//     const _priceData = await res.json()
//     tokenPrice = _priceData['huobi-token'].usd
//   } else if (pool.tokenName === 'PURE') {
//     tokenPrice = cakePriceUsd.toNumber()
//     // tokenPrice = useSingleTokenPrive('PURE-token')
//   }
//   // console.log(tokenPrice)
//   return tokenPrice
// })

export default Farm
