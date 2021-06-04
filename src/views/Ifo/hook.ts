import { useEffect, useState } from 'react'
import { useWallet, UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import {toWei} from 'web3-utils'
import { Contract } from 'ethers-multicall-x'
import useBlock from '../../hooks/useBlock'
import ERC20 from '../../config/abi/erc20.json'
import { getMultiCallProvider } from '../../utils/multicall'
import { getWeb3 } from '../../utils/web3'

export const useIFO = (ifo) => {
  const blockNumber = useBlock()
  const {account} = useWallet()
  const web3 = getWeb3()
  const now: number = parseInt(String(Date.now() / 1000))

  const [info, setInfo] = useState()


  let {status} = ifo
  if (status === 0) {
    if(now < ifo.startAt){
      status = 0
    }else if(now < ifo.time) {
      status = 1
    }else {
      status = 2
    }
  }

  // eslint-disable-next-line no-param-reassign
  ifo = {
    ...ifo,
    status,
    totalPurchasedUnderlying: status === 3 ? toWei(ifo.amount) : 0
  }

  useEffect(() => {
    if(account){
      const currencyToken:any = !ifo.currency.isToken
        ? null
        : new Contract(ifo.currency.address, ERC20)

      const multicallProvider = getMultiCallProvider(web3.currentProvider, 128)

      const poolContract:Contract = new Contract(ifo.address, ifo.abi)

      const underlyingToken:Contract = new Contract(ifo.underlying.address, ERC20)


    }
  }, [account, blockNumber])
}