import BigNumber from 'bignumber.js'
import Web3 from 'web3'

BigNumber.config({ EXPONENTIAL_AT: [-20, 40] })

export const formatAddress = (address) => {
  return `${address.slice(0, 6)} ... ${address.slice(-3)}`
}

export const formatAmount = (value, decimals = 18, fixed = 6) => {
  return new BigNumber(
    fromWei(value, decimals).toFixed(fixed === -1 ? null : fixed, 1)
  )
    .toNumber()
    .toString()
}

export const numToWei = (value, decimals = 18) => {
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

export const weiPlus = (value1, value2) => {
  return new BigNumber(
    new BigNumber(value1 || 0)
      .plus(new BigNumber(value2 || 0))
      .toFixed(6)
  )
    .toNumber()
    .toString()
}

export const weiDiv = (value1, value2) => {
  if (value1 * 1 === 0 || value2 * 1 === 0) {
    return 0
  }
  console.log('weiDiv', value1, value2)
  return new BigNumber(
    new BigNumber(value1).dividedBy(new BigNumber(value2)).toFixed(6)
  )
    .multipliedBy(100)
    .toString()
}

// export const splitFormat = (num, fractionDigits) => {
//   if (!fractionDigits) fractionDigits = 0
//   if (Number.isNaN(num)) return num
//   if (num) {
//     if (num === '0') {
//       return num
//     }
//     if (fractionDigits === 0) {
//       return parseInt(num)
//     }
//     if (num.toString().indexOf('.') > -1) {
//       let digit = num.toString().split('.')
//       if (digit[1].length > fractionDigits) {
//         let digitResult = digit[1].substring(0, fractionDigits)
//         return `${digit[0]} . ${digitResult}`
//       } else {
//         return num
//       }
//     }
//   } else {
//     return num
//   }
// }
