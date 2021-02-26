import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@pancakeswap-libs/uikit'
import { ifosConfig } from 'config/constants'
import useI18n from 'hooks/useI18n'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'

const LaunchIfoCallout = styled(BaseLayout)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  flex: 1;
  & > div {
    background: linear-gradient(134deg, #093438 0%, #072c30 100%, #18d6ad 100%);
    border-radius: 8px;
    padding: 24px;
  }
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`
const IfoWrapper = styled.div`
  display: flex;
  ${({ theme }) => theme.mediaQueries.xs} {
    display: block;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
  }
  > div {
    margin: 0 20px;
  }
`

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => {
  const TranslateString = useI18n()

  return (
    <IfoWrapper>
      <IfoCards isSingle>
        <IfoCard ifo={activeIfo} />
      </IfoCards>
      <LaunchIfoCallout>
        <div>
          <Title as="h2" style={{color: "#ACE0CD", textAlign: "center", fontWeight: 500}}>{TranslateString(592, 'How to take part')}</Title>
          <Heading mb="16px" style={{color: "#ACE0CD", fontWeight: 400}}>{TranslateString(594, 'Before Sale')}:</Heading>
          <List>
            <li style={{color: "#366061"}}>{TranslateString(596, 'Buy PURE and BNB tokens')}</li>
            <li style={{color: "#366061"}}>{TranslateString(598, 'Get PURE-BNB LP tokens by adding PURE and BNB liquidity')}</li>
          </List>
          <Flex mb="16px" style={{justifyContent: "center"}}>
            <LinkExternal style={{color: "#ACE0CD"}} href="https://exchange.pureswap.finance/#/swap" mr="16px">
              {TranslateString(1060, 'Buy PURE')}
            </LinkExternal>
            <LinkExternal style={{color: "#ACE0CD"}} href="https://exchange.pureswap.finance/#/add/ETH/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82">
              {TranslateString(1062, 'Get LP tokens')}
            </LinkExternal>
          </Flex>
          <Heading mb="16px" style={{color: "#ACE0CD", fontWeight: 400}}>{TranslateString(600, 'During Sale')}:</Heading>
          <List>
            <li style={{color: "#366061"}}>{TranslateString(602, 'While the sale is live, commit your PURE-LP tokens to buy the IFO tokens')}</li>
          </List>
          <Heading mb="16px" style={{color: "#ACE0CD", fontWeight: 400}}>{TranslateString(604, 'After Sale')}:</Heading>
          <List>
            <li style={{color: "#366061"}}>{TranslateString(606, 'Claim the tokens you bought, along with any unspent funds.')}</li>
            <li style={{color: "#366061"}}>{TranslateString(608, 'Done!')}</li>
          </List>
          <Text as="div" pt="16px">
            <Button
              fullWidth
              as="a"
              variant="secondary"
              href="https://docs.pancakeswap.finance/core-products/ifo-initial-farm-offering"
            >
              {TranslateString(610, 'Read more')}
            </Button>
          </Text>
        </div>
        <div>
          {/* <Image src="/images/ifo-bunny.svg" alt="ifo bunny" width={436} height={406} responsive /> */}
          <div>
            <Title as="h2" style={{color: "#ACE0CD", textAlign: "center", fontWeight: 500}}>{TranslateString(512, 'Want to launch your own IFO?')}</Title>
            <Text mb={3} style={{color: "#366061"}}>
              {TranslateString(
                514,
                'Launch your project with PureSwap, HECO most-used AMM project and liquidity provider, to bring your token directly to the most active and rapidly growing community on HECO.',
              )}
            </Text>
            <Button
              fullWidth
              variant="secondary"
              as="a"
              href="https://docs.google.com/forms/d/e/1FAIpQLScGdT5rrVMr4WOWr08pvcroSeuIOtEJf1sVdQGVdcAOqryigQ/viewform"
              external
            >
              {TranslateString(516, 'Apply to launch')}
            </Button>
          </div>
        </div>
      </LaunchIfoCallout>
    </IfoWrapper>
  )
}

export default Ifo
