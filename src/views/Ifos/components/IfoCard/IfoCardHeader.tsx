import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Flex } from '@pancakeswap-libs/uikit'

interface IfoCardHeaderProps {
  ifoId: string
  name: string
  subTitle: string
}

const StyledIfoCardHeader = styled.div`
  display: flex;
  margin-bottom: 15px;
  & > div {
    flex: 1;
  }
`

const Name = styled(Heading).attrs({ as: 'h3', size: 'lg' })`
  margin-bottom: 4px;
  color: #ace0cd;
  text-align: right;
  font-weight: 500;
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-bottom: 20px;
  text-align: right;
  position: relative;
  top: 15px;
`

const IfoCardHeader: React.FC<IfoCardHeaderProps> = ({ ifoId, name, subTitle }) => {
  return (
    <StyledIfoCardHeader>
      <img src={`/images/ifos/${ifoId}.svg`} alt={ifoId} width="64px" height="64px" />
      <div>
        <Name>{name}</Name>
        <Description>{subTitle}</Description>
      </div>
    </StyledIfoCardHeader>
  )
}

export default IfoCardHeader
