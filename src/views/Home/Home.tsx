import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
// import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
// import WinCard from 'views/Home/components/WinCard'

const Hero = styled.div`
  align-items: left;
  background-image: url('/images/home_header_bg.png')
  // background-image: url('/images/pan-bg-mobile.svg');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  padding: 24px 0 134px 0;
  // margin-bottom: 32px;
  // padding-top: 116px;
  // text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    // background-image: url('/images/pan-bg2.svg'), url('/images/pan-bg.svg');
    // background-position: left center, right center;
    // height: 165px;
    // padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  display: flex;
  margin-bottom: 32px;
  & > div {
    width: 30%;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    display: block;
    & > div {
      width: 100%;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    & > div {
      width: 100%;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    & > div {
      width: 30%;
    }
  }
`
const CardsB = styled(BaseLayout)`
  display: flex;
  margin-bottom: 32px;
  margin-left: 38px;
  & > div {
    width: 50%;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    display: block;
    margin-left: 0;
    & > div {
      width: 100%;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 0;
    & > div {
      width: 100%;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    margin-left: 38px;
    & > div {
      width: 50%;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`
const CardImage = styled.img`
  margin-bottom: 16px;
  position: absolute;
  right: 0;
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          {TranslateString(576, 'PureSwap')}
        </Heading>
        {/* <CardImage src="/images//home_header_bg.png" alt="cake logo" width={800} /> */}
        <Text style={{ color: '#85898c' }}>
          {TranslateString(578, 'The #1 AMM and yield farm on Binance Smart Chain.')}
        </Text>
      </Hero>
      <div>
        <Cards>
          <EarnAPYCard />
          <FarmStakingCard />
          <TotalValueLockedCard />
          {/* <LotteryCard /> */}
        </Cards>
        <CardsB>
          <CakeStats />
          <EarnAssetCard />
        </CardsB>
        {/* <CTACards><WinCard /></CTACards> */}
      </div>
    </Page>
  )
}

export default Home
