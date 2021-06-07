import React, { Component } from 'react'
import './assets/scss/index.scss'
import { Button, useWalletModal } from '@pureswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
// @ts-ignore
import IFOCard from './components/IFOCard'
import ifos from '../../config/constants/ifo'

const IFO = () => {
  return (
    <div>
      {ifos.map((ifo) => (
        <IFOCard key={ifo.address} ifo={ifo} />
      ))}
    </div>
  )
}

export default IFO
