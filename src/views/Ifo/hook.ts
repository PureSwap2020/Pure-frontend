import { useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useBlock from '../../hooks/useBlock'

export const useIFO = (ifo) => {
  const blockNumber = useBlock()
  const {account} = useWallet()

  const now = parseInt(Date.now() / 1000)

  useEffect(() => {
    if(account){
      console.log(blockNumber)
    }
  }, [account, blockNumber])
}