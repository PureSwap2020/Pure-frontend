import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import factoryABI from 'config/abi/bunnyFactory.json'
import PureSwapPairABI from 'config/abi/PureSwapPair.json'
import multicall from 'utils/multicall'

const fetchPrice = async(tokenName: string) => {
  if (tokenName === undefined) {
    return new BigNumber(0)
  }
	let coingeckoTokenName: string
	if (tokenName === 'BUSD') {
		coingeckoTokenName = 'binance-usd'
	} else if (tokenName === 'WBNB') {
		coingeckoTokenName = 'binancecoin'
	}
  const _price = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoTokenName}&vs_currencies=usd`)
  const _priceJson = await _price.json()
  window.localStorage.setItem(tokenName, JSON.stringify(_priceJson[coingeckoTokenName].usd))
  // console.log(_priceJson)
  return 0 // new BigNumber(_priceJson[coingeckoTokenName].usd)
}

// import farmsConfig from 'config/constants/farms'
const fetchTvl = async () => {
  const chainId = 97
  // const data = {}
  const calls = [{
    address: '0x8e0b57fD526d3540322d29dE060B21d43b857699', // factory address
    name: 'allPairsLength',
  }]
  const factory = await multicall(factoryABI, calls)
  const arrPairCall = []
  
  for (let i = 0; i < Number(factory); i ++) {
    arrPairCall.push({
      address: '0x8e0b57fD526d3540322d29dE060B21d43b857699', // factory address
      name: 'allPairs',
      params: [i]
    })

  }
  
  const pair = await multicall(factoryABI, arrPairCall)
  // console.log(pair)
  const getReservesCalls = []
  for (let i = 0; i < pair.length; i ++) {
    getReservesCalls.push({
      address: pair[i][0],
      name: 'getReserves',
    },{
      address: pair[i][0],
      name: 'token0',
    },{
      address: pair[i][0],
      name: 'token1',
    })
  }
  const reserves = await multicall(PureSwapPairABI, getReservesCalls)
  // get lp number, token0, token1
  const lp = []
  for (let i = 0; i < pair.length; i ++) {
    lp.push({
      num: reserves[i * 3],
      token0: reserves[i * 3 + 1][0],
      token1: reserves[i * 3 + 2][0]
    })
  }
  // get lp token1 name
  const getTokenNameCalls = []
  for (let i = 0; i < lp.length; i ++) {
    getTokenNameCalls.push({
      address: lp[i].token1, // token1 address
      name: 'symbol',
    })
  }
  const tokenNameArr = await multicall(erc20, getTokenNameCalls)
  const getLpToken = (slp) => {
    const arr = []
    slp.forEach(async (item, index) => {
      if (tokenNameArr[index][0] !== 'PURE') {
        fetchPrice(tokenNameArr[index][0]) // 获取token 对应价格
      }
      const obj = { 
        number: item.num[1], // 绑定number为 token1对应number
        tokenName: tokenNameArr[index][0]
      }
      arr.push(obj)
    })
    return arr
  }
  const data = getLpToken(lp)
  return data
}

export default fetchTvl