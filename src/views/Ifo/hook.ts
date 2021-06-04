import { useEffect, useState } from 'react'
import { useWallet, UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import { toWei, fromWei } from 'web3-utils'
import { providers } from 'ethers'
import { Contract } from 'ethers-multicall-x'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import useBlock from '../../hooks/useBlock'
import ERC20 from '../../config/abi/erc20.json'
import { getMultiCallProvider, processResult } from '../../utils/multicall'
import { getWeb3 } from '../../utils/web3'
import { formatAmount } from '../../utils/formatBalance'
import useWeb3 from '../../hooks/useWeb3'

export const useIFO = (ifo) => {
  const blockNumber = useBlock()
  const { account, status, chainId } = useWallet()
  const web3 = useWeb3()
  const now: number = parseInt(String(Date.now() / 1000))

  const [info, setInfo] = useState()

  if (ifo.status === 0) {
    if (now < ifo.startAt) {
      ifo.status = 0
    } else if (now < ifo.time) {
      ifo.status = 1
    } else {
      ifo.status = 2
    }
  }

  // eslint-disable-next-line no-param-reassign
  ifo = {
    ...ifo,
    totalPurchasedUnderlying: ifo.status === 3 ? toWei(ifo.amount) : 0,
  }

  // @ts-ignore
  useEffect(() => {
    if (account) {
      const currencyToken: any = !ifo.currency.isToken ? null : new Contract(ifo.currency.address, ERC20)

      // @ts-ignore
      const multicallProvider = getMultiCallProvider(new providers.Web3Provider(web3.currentProvider), chainId)

      const poolContract: Contract = new Contract(ifo.address, ifo.abi)
      const promiseList = [
        poolContract.price(), // 结算时间点
        poolContract.totalPurchasedCurrency(), // 总申购的量
        poolContract.purchasedCurrencyOf(account),
        poolContract.totalSettleable(),
        poolContract.settleable(account),
        poolContract.totalSettledUnderlying(),
      ]

      // 追加可能存在的
      poolContract.time && promiseList.push(poolContract.time())
      poolContract.timeSettle && promiseList.push(poolContract.timeSettle())
      currencyToken && promiseList.push(currencyToken.allowance(account, ifo.address))

      return multicallProvider
        .all(promiseList)
        .then((data) => {
          // eslint-disable-next-line no-param-reassign
          data = processResult(data)
          let [
            price,
            totalPurchasedCurrency,
            purchasedCurrencyOf,
            totalSettleable,
            settleable,
            totalSettledUnderlying,
            time = 0,
            timeSettle = 0,
            currencyAllowance = 0,
          ] = data
          const [totalCompleted_, totalAmount, totalVolume, totalRate] = totalSettleable
          const [completed_, amount, volume, rate] = settleable

          let status = ifo.status || 0 // 即将上线
          const timeClose = time
          if (timeSettle) {
            // time 如果没有的话，使用timeSettle填充
            time = timeSettle
          }
          if (ifo.start_at < now && status < 1) {
            // 募集中
            status = 1
          }
          if (time < now && status < 2) {
            // 结算中
            status = 2
          }
          if (totalVolume.toString() === totalSettledUnderlying.toString() && totalVolume > 0) {
            status = 3
          }

          const totalPurchasedAmount = new BigNumber(toWei(ifo.amount, 'ether').toString())
            .multipliedBy(new BigNumber(price))
            .div(new BigNumber(toWei('1', 'ether')))

          const totalPurchasedUnderlying = toWei(
            new BigNumber(totalPurchasedCurrency).dividedBy(new BigNumber(price)).toFixed(0, 1),
            'ether',
          )

          let isJoin = false
          if (purchasedCurrencyOf > 0) {
            isJoin = true
          }

          Object.assign(ifo.currency, {
            allowance: currencyAllowance,
          })

          // @ts-ignore
          const progress: number = new BigNumber(totalPurchasedCurrency).dividedBy(totalPurchasedAmount).toFixed(2, 1).toString() * 1

          setInfo({
            ...ifo,
            ratio: `1${ifo.underlying.symbol}=${formatAmount(price, 18, 5)}${ifo.currency.symbol}`,
            progress,
            status,
            time,
            timeClose,
            price: fromWei(price, 'ether'),
            totalPurchasedCurrency,
            totalPurchasedAmount: totalPurchasedAmount.toString(),
            totalPurchasedUnderlying,
            purchasedCurrencyOf,
            totalSettleable: {
              completed_: totalCompleted_,
              amount: totalAmount,
              volume: totalVolume,
              rate: totalRate,
            },
            totalSettledUnderlying,
            settleable: {
              completed_,
              amount,
              volume,
              rate,
            },
          })
        })
        .catch((e) => {
          console.log(e, '===== usePoolsInfo =====')
          setInfo(ifo)
        })
    }
    return () => {}
  }, [account, blockNumber, status])

  return [info]
}
