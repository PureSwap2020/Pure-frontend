import { AbiItem } from 'web3-utils'
import { Interface } from '@ethersproject/abi'
import { getWeb3 } from 'utils/web3'
import { Contract, Provider, setMulticallAddress } from 'ethers-multicall-x';
import {cloneDeep } from 'lodash'
import MultiCallAbi from 'config/abi/Multicall.json'
import { getMulticallAddress } from 'utils/addressHelpers'



interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (exemple: balanceOf)
  params?: any[] // Function params
}

const multicall = async (abi: any[], calls: Call[]) => {
  const web3 = getWeb3()
  const multi = new web3.eth.Contract((MultiCallAbi as unknown) as AbiItem, getMulticallAddress())
  const itf = new Interface(abi)
  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  
  const { returnData } = await multi.methods.aggregate(calldata).call()
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

  return res
}



export function getMultiCallProvider(provider, chainId) {
  // HECO multical
  const multiCallProvider = new Provider(provider, chainId);
  return multiCallProvider
}

/**
 * 递归toString
 */
export function processResult(data:any) {
  // eslint-disable-next-line no-param-reassign
  data = cloneDeep(data)
  if (Array.isArray(data)){
    data.map((o, i) => {
      // eslint-disable-next-line no-param-reassign
      data[i] = processResult(o)
      return 0
    })
    return data
  }if(data.toString){
    return data.toString()
  }if(typeof data === 'object'){
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for(const key in data){
      Object.assign(data, {
        [key]: processResult(0)
      })
    }
    return data
  } 
    return data
}

export default multicall
