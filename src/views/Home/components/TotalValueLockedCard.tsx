import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'

const StyledTotalValueLockedCard = styled(Card)`
  background: linear-gradient(134deg, #052528 0%, #093337 100%, #18D6AD 100%);
  display: flex;
  flex: 1;
  position: absolute;
  right: 45px;
  height: 265px;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const data = useGetStats()
  const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px" style={{marginTop: '60px', fontWeight: 'normal'}}>
          {TranslateString(762, 'Total Value Locked (TVL)')}
        </Heading>
        {data ? (
          <>
            <Heading size="xl" style={{marginTop: '36px', marginBottom: '10px', fontWeight: 'normal'}}>{`$${tvl}`}</Heading>
            <Text color="textSubtle">{TranslateString(764, 'Across all LPs and Syrup Pools')}</Text>
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
