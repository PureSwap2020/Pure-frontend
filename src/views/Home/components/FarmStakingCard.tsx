import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  background: linear-gradient(134deg, #093438 0%, #072c30 100%, #18d6ad 100%);
  height: 355px;
  width: 40% !important;
  text-align: center;
  position: relative;
  z-index: 99;
  margin-top: -50px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 100% !important;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100% !important;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 40% !important;
    margin-top: -50px;
    margin-bottom: 0;
  }
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px" style={{ fontWeight: 400 }}>
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        {/* <CardImage src="/images/cake.svg" alt="cake logo" width={64} height={64} /> */}
        <Block>
          <Label>{TranslateString(544, 'PURE to Harvest')}:</Label>
          <CakeHarvestBalance />
        </Block>
        <Block>
          <Label>{TranslateString(546, 'PURE in Wallet')}:</Label>
          <CakeWalletBalance />
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              variant="secondary"
            >
              {pendingTx
                ? TranslateString(548, 'Collecting PURE')
                : TranslateString(532, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton variant="secondary" />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
