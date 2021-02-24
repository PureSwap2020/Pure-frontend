import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  height: 355px;
  width: 414px !important;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(134deg, #093438 0%, #072C30 100%, #18D6AD 100%);
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px" style={{fontWeight: 'normal'}}>
          {TranslateString(534, 'Pure Stats')}
        </Heading>
        <Row>
          <Text color="textSubtle" fontSize="14px">{TranslateString(536, 'Total Pure Supply')}</Text>
          {cakeSupply && <CardValue bold={false} fontSize="14px" value={cakeSupply} />}
        </Row>
        <Row>
          <Text color="textSubtle" fontSize="14px">{TranslateString(538, 'Total Pure Burned')}</Text>
          <CardValue fontSize="14px" bold={false} value={getBalanceNumber(burnedBalance)} />
        </Row>
        <Row>
          <Text color="textSubtle" fontSize="14px">{TranslateString(540, 'New Pure/block')}</Text>
          <CardValue fontSize="14px" bold={false} decimals={0} value={25} />
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
