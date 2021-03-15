// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { useTvl, usePools, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { fetchPoolApy } from 'state/pools/fetchPools';

const StyledTotalValueLockedCard = styled(Card)`
  background: linear-gradient(134deg, #052528 0%, #093337 100%, #18d6ad 100%);
  // display: flex;
  // flex: 1;
  // position: absolute;
  // right: 0;
  height: 265px;
  position: relative;
  right: 38px;

  ${({ theme }) => theme.mediaQueries.xs} {
    right: 0;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    right: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    right: 38px;
  }
`



const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const data = useGetStats()
  const { account } = useWallet()
  const lpTvl = useTvl()
  const pools = usePools(account)
  const priceBnbBusd = usePriceBnbBusd()
  const priceCakeBusd = usePriceCakeBusd()

  const getApy = (pool) => {
    fetchPoolApy(pool, priceCakeBusd, priceBnbBusd).then(res => {
      window.localStorage.setItem(`poolApy${pool.sousId}Price`, res.tvlPrice.toString())
    })
  }
  pools.forEach(item => {
    getApy(item)
  })
  

  let poolSum = 0 // pools total price for usd
  for (let i = 0; i < pools.length; i ++) {
    const poolApy = window.localStorage.getItem(`poolApy${pools[i].sousId}Price`) ? window.localStorage.getItem(`poolApy${pools[i].sousId}Price`) : 0
    poolSum += Number(poolApy)
  }
  let lpTvlSum = 0 // lp total price for usd
  if (lpTvl.length > 0) {
    for (let i = 0; i < lpTvl.length; i ++) {
      if (lpTvl[i].tokenName === 'PURE') {
        const priceTvl = new BigNumber(lpTvl[i].number._hex)
          .times(priceCakeBusd)
          .times(new BigNumber(2))
          .div(new BigNumber(10).pow(18))
        // console.log(priceTvl.toNumber())
        lpTvlSum += priceTvl.toNumber()
      } else if (lpTvl[i].tokenName !== undefined) {
        const tokenPrice = localStorage.getItem(lpTvl[i].tokenName) || 0
        const priceTvl = new BigNumber(lpTvl[i].number._hex)
              .times(tokenPrice)
              .times(new BigNumber(2))
              .div(new BigNumber(10).pow(18))
        lpTvlSum += priceTvl.toNumber()
      }
    }
  }

  const tvl = (lpTvlSum + poolSum).toFixed(2)
  // const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px" style={{ marginTop: '28px', fontWeight: 'normal' }}>
          {TranslateString(762, 'Total Value Locked (TVL)')}
        </Heading>
        {data ? (
          <>
            <Heading
              size="xl"
              style={{ marginTop: '36px', marginBottom: '10px', fontWeight: 'normal' }}
            >{`$${tvl}`}</Heading>
            <Text color="textSubtle">{TranslateString(764, 'Across all LPs and Pools')}</Text>
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
