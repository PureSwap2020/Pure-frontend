import React, { useCallback, useRef } from 'react'
import styled, { ThemeConsumer } from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@pancakeswap-libs/uikit'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFarms, usePriceBnbBusd } from 'state/hooks'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'

const StyledFarmStakingCard = styled(Card)`
  background: linear-gradient(134deg, #093337 0%, #052528 100%, #18d6ad 100%);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 265px;
  position: relative;
  left: 38px;

  ${({ theme }) => theme.mediaQueries.xs} {
    left: 0;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    left: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    left: 38px;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  font-weight: 500;
`
const EarnAPYCard = () => {
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const bnbPrice = usePriceBnbBusd()

  const maxAPY = useRef(Number.MIN_VALUE)

  const getHighestAPY = () => {
    const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')
    calculateAPY(activeFarms)
    return (maxAPY.current * 100).toLocaleString('en-US').slice(0, -1)
  }

  const calculateAPY = useCallback(
    (farmsToDisplay) => {
      const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)

      farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const cakeRewardPerBlock = CAKE_PER_BLOCK.times(farm.poolWeight)
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)
        let apy = cakePriceVsBNB.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken)
        
        if (farm.quoteTokenSymbol === QuoteToken.BUSD) {
          apy = cakePriceVsBNB.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          apy = cakeRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const cakeApy =
            farm && cakePriceVsBNB.times(cakeRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = cakeApy && dualApy && cakeApy.plus(dualApy)
        }
        if (maxAPY.current <= apy.toNumber()) maxAPY.current = apy.toNumber()

        return apy
      })
    },
    [bnbPrice, farmsLP],
  )

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="lg" style={{ marginTop: '28px', fontWeight: 'normal' }}>
          Earn up to
        </Heading>
        <CardMidContent color="#ACE0CD" style={{ marginTop: '36px', marginBottom: '10px' }}>
          {getHighestAPY() ? (
            `${getHighestAPY()}% ${TranslateString(736, 'APR')}`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading style={{ fontSize: '14px', fontWeight: 'normal', color: '#366061' }} size="lg">
            in Farms
          </Heading>
          <NavLink exact activeClassName="active" to="/farms" id="farm-apy-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
