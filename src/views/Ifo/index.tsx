import React, { Component } from 'react'
import './assets/scss/index.scss'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import IFOCard from './components/IFOCard'
import ifos from '../../config/constants/ifo'

const IFO = () => {
  const { account, connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  return (
    <div>
      <div className="test-less">
        {
          !account ? (
            <Button onClick={onPresentConnectModal}>连接钱包</Button>
          ):
            `连接成功：${account}`
        }
      </div>
      {
        ifos.map(ifo => <IFOCard key={ifo.address} ifo/>)
      }

    </div>
  )
}

export default IFO