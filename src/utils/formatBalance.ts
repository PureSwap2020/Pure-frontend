import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const formatAmount = (value, decimals:any = 18, fixed = 6) => {
  return new BigNumber(
    fromWei(value, decimals).toFixed(fixed === -1 ? null : fixed)
  )
    .toNumber()
    .toString()
}

export const numToWei = (value, decimals:any = 18) => {
  return new BigNumber(
    toWei(value, decimals).toNumber().toFixed(decimals)
  ).toString()
}

export const fromWei = (value, decimals = 18) => {
  return new BigNumber(value).dividedBy(new BigNumber(10).pow(decimals))
}

const toWei = (value, decimals) => {
  return new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimals))
}