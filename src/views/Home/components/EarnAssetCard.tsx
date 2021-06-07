import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pureswap-libs/uikit'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'

const StyledFarmStakingCard = styled(Card)`
  height: 355px;
  width: 414px !important;
  background: #00182100 !important;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const StyledHeadingSpan = styled.span`
  font-size: 80px;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 500;
`
const StyledHeadingSmallSpan = styled.span`
  font-weight: normal;
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const EarnAssetCard = () => {
  const activeNonCakePools = pools.filter((pool) => !pool.isFinished && !pool.tokenName.includes('CAKE'))
  const latestPools: Pool[] = orderBy(activeNonCakePools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
  // Always include CAKE
  const assets = ['CAKE', ...latestPools.map((pool) => pool.tokenName)].join(', ')

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="lg">
          <StyledHeadingSpan>Earn Pure</StyledHeadingSpan>
        </Heading>
        {/* <CardMidContent color="invertedContrast">{assets}</CardMidContent> */}
        <Flex justifyContent="space-between">
          <Heading size="lg">
            <StyledHeadingSmallSpan>in Pools</StyledHeadingSmallSpan>
            <NavLink exact activeClassName="active" to="/syrup" id="pool-cta">
              <ArrowForwardIcon
                style={{ marginTop: '10px', position: 'relative', top: '4px', left: '10px' }}
                mt={30}
                color="primary"
              />
            </NavLink>
          </Heading>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
