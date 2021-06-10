import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import {
  getAddress,
  getMasterChefAddress,
  getCakeAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getBunnyFactoryAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getPointCenterIfoAddress,
  getBunnySpecialAddress,
} from 'utils/addressHelpers'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import ifo from 'config/abi/ifo.json'
import erc20 from 'config/abi/erc20.json'
import bunnyFactory from 'config/abi/bunnyFactory.json'
import pancakeRabbits from 'config/abi/pancakeRabbits.json'
import lottery from 'config/abi/lottery.json'
import lotteryTicket from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import profile from 'config/abi/pancakeProfile.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import bunnySpecial from 'config/abi/bunnySpecial.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useBlock from './useBlock'
import { ADDRESS_NONE } from '../config'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoContract = (address: string) => {
  const ifoAbi = (ifo as unknown) as AbiItem
  return useContract(ifoAbi, address)
}

export const useERC20 = (address: string) => {
  const erc20Abi = (erc20 as unknown) as AbiItem
  return useContract(erc20Abi, address)
}


export const useCake = () => {
  return useERC20(getCakeAddress())
}

export const useBunnyFactory = () => {
  const bunnyFactoryAbi = (bunnyFactory as unknown) as AbiItem
  return useContract(bunnyFactoryAbi, getBunnyFactoryAddress())
}

export const usePancakeRabbits = () => {
  const pancakeRabbitsAbi = (pancakeRabbits as unknown) as AbiItem
  return useContract(pancakeRabbitsAbi, getPancakeRabbitsAddress())
}

export const useProfile = () => {
  const profileABIAbi = (profile as unknown) as AbiItem
  return useContract(profileABIAbi, getPancakeProfileAddress())
}

export const useLottery = () => {
  const abi = (lottery as unknown) as AbiItem
  return useContract(abi, getLotteryAddress())
}

export const useLotteryTicket = () => {
  const abi = (lotteryTicket as unknown) as AbiItem
  return useContract(abi, getLotteryTicketAddress())
}

export const useMasterchef = () => {
  const abi = (masterChef as unknown) as AbiItem
  return useContract(abi, getMasterChefAddress())
}

export const useSousChef = (id) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const rawAbi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  const abi = (rawAbi as unknown) as AbiItem
  return useContract(abi, getAddress(config.contractAddress))
}

export const usePointCenterIfoContract = () => {
  const abi = (pointCenterIfo as unknown) as AbiItem
  return useContract(abi, getPointCenterIfoAddress())
}

export const useBunnySpecialContract = () => {
  const abi = (bunnySpecial as unknown) as AbiItem
  return useContract(abi, getBunnySpecialAddress())
}

export const useBalance = (address) => {
  const BNBBalance = useBNBBalance()
  const tokenBalance = useTokenBalance(address)
  const [balance, setBalance] = useState('0')
  useEffect(() => {
    if(address === ADDRESS_NONE){
      setBalance(BNBBalance)
    }else{
      setBalance(tokenBalance)
    }
  }, [BNBBalance, tokenBalance])
  return balance
}


export const useBNBBalance = () => {
  const { account} = useWallet()
  const web3 = useWeb3()
  const blockHeight = useBlock()
  const [balance, setBalance] = useState('0')
  useEffect(() => {
    if (account) {
      web3
        .eth
        .getBalance(account)
        .then((balance) => {
          setBalance(balance.toString())
        })
        .catch((e) => {
          return 0
        })
    }
  }, [account, blockHeight])
  return balance
}

export const useTokenBalance = (address) => {
  const { account} = useWallet()
  const blockHeight = useBlock()
  const contract = useERC20(address)
  const [balance, setBalance] = useState('0')
  useEffect(() => {
    if (account && contract && address) {
      contract
        .methods
        .balanceOf(account)
        .call()
        .then((balance) => {
          setBalance(balance.toString())
        })
        .catch((e) => {
          return 0
        })
    }
  }, [account, blockHeight, address])
  return balance
}

export const useTokenAllowance = (address)  => {
  const { account} = useWallet()
  const blockHeight = useBlock()
  const contract = useERC20(address)
  const [allowance, setAllowancee] = useState('0')
  useEffect(() => {
    if (address && contract) {
      contract
        .methods
        .allowance(account, address)
        .call()
        .then((allowance) => {
          setAllowancee(allowance.toString())
        })
        .catch((e) => {
          console.log(e)
          return 0
        })
    }
  }, [account, address, blockHeight])
  return allowance
}

export const useTokenDecimals = (address) => {
  const { account} = useWallet()
  const blockHeight = useBlock()
  const contract = useERC20(address)
  const [decimals, setDecimals] = useState(18)
  useEffect(() => {
    if (account && contract && address) {
      contract
        .methods
        .decimals()
        .call()
        .then((decimals) => {
          setDecimals(decimals)
        })
        .catch((e) => {
          return 18
        })
    }
  }, [account, blockHeight, address])
  return decimals
}

export default useContract
