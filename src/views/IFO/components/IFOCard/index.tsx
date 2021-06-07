import React, { Component, useState, useEffect } from 'react'
import { Button, message } from 'antd'
import './index.scss'
// @ts-ignore
import { toWei } from 'web3-utils'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Web3 from 'web3'
import Timer from 'react-compound-timer'
import { useIFO } from '../../hook'
import { formatAmount, fromWei } from '../../../../utils/format'
import Pureswap from '../../assets/icon/Pureswap@2x.png'
import { useBalance } from '../../../../hooks/useContract'

const IFOCard = (props) => {
  const { ifo } = props
  const [info, approve, stake, claim] = useIFO(ifo)
  const { account, connect, reset, status } = useWallet()
  const [now, setNow] = useState(parseInt((Date.now() / 1000).toString()))
  const [amount, setAmount] = useState('')
  // const [leftTime, setLeftTime] = useState(0)
  const [isApprove, setIsApprove] = useState(false)
  const [approveLoadFlag, setApproveLoadFlag] = useState(false)
  const [confirmDisableFlag, setConfirmDisableFlag] = useState(false)
  const [claimDisableFlag, setClaimDisableFlag] = useState(false)
  const [loadFlag, setLoadFlag] = useState(false)
  const balance = useBalance(ifo.currency.address)

  useEffect(() => {
    console.log(info)
  }, [info])

  useEffect(() => {
    console.log('balance', balance)
  }, [balance])

  useEffect(() => {
    if (info && info.allowance > 0) {
      setIsApprove(false)
    }
  }, [info])

  useEffect(() => {
    const timerId = setTimeout(() => {
      const now = parseInt((Date.now() / 1000).toString())
      setNow(now)
    }, 1000)
    return () => {
      clearTimeout(timerId)
    }
  }, [now])

  let leftTime = 0
  if (info && info.startAt > now) {
    leftTime = (info.startAt - now) * 1000
  } else if (info && info.timeClose > now) {
    leftTime = (info.timeClose - now) * 1000
  } else if (info && info.time > now) {
    leftTime = (info.time - now) * 1000
  }

  useEffect(() => {
    if ((info && info.startAt < now && info && info.timeClose > now) || (info && info.time < now)) {
      setConfirmDisableFlag(true)
    }
    if ((info && info.settleable && info.settleable.volume < 0) && (info && info.startAt < now && info && info.timeClose > now) || (info && info.time < now)) {
      setClaimDisableFlag(true)
    }
  }, [leftTime])

  const renderStatus = (pool) => {
    const { status, timeClose = 0 } = pool
    switch (status) {
      case 0:
        return (
          <p className="timer_text">
            Will start in
          </p>
        )
      case 1:
        if (timeClose === 0 || timeClose > now) {
          return (
            <p className="timer_text">
              Undergoing
            </p>
          )
        }
        return (
          <p className="timer_text">
            Waiting
          </p>
        )

      case 2:
        return (
          <p className="timer_text">
           Calculating
          </p>
        )
      case 3:
        return (
          <p className="timer_text">
           Finished
          </p>
        )
      default:
        return (
          <p className="timer_text">
            Will start in
          </p>
        )
    }
  }

  const onChange = (e) => {
    const { value } = e.target
    const re = /^[0-9]+([.|,][0-9]+)?$/g
    if (value === '' || re.test(value) || (value.split('.').length === 2 && value.slice(value.length - 1) === '.')) {
      setAmount(value)
    }
  }

  const onApprove = () => {
    if (!account) {
      return
    }

    if (approveLoadFlag) return
    setApproveLoadFlag(true)
    approve()
      .on('receipt', (_, receipt) => {
        console.log('approve success')
        setApproveLoadFlag(false)
        setIsApprove(false)
        message.success('approve success')
      })
      .on('error', (err, receipt) => {
        console.log('approve error', err)
        setApproveLoadFlag(false)
      })
  }

  const onConfirm = () => {
    if (!account) {
      return
    }

    if (!amount) {
      return
    }

    if (Number.isNaN(parseInt(amount))) {
      return
    }

    if (confirmDisableFlag) return
    if (approveLoadFlag) return
    setApproveLoadFlag(true)
    stake(toWei(amount.toString()))
      .on('receipt', (_, receipt) => {
        console.log('stake success')
        setApproveLoadFlag(false)
        message.success('success')
      })
      .on('error', (err, receipt) => {
        console.log('stake error', err)
        setApproveLoadFlag(false)
      })

  }

  const onClaim = (e, btnFlag) => {
    if (!account) {
      return
    }
    // 未中签 claim
    if (!(btnFlag && btnFlag.settleable && btnFlag.settleable.amount > 0 && now >= btnFlag.timeClose && now < btnFlag.time)) return

    // 奖励 claim
    if (!(btnFlag && btnFlag.settleable && btnFlag.settleable.volume > 0 && btnFlag.status >= 2 && now > btnFlag.timeClose && now >= btnFlag.time)) return

    if (claimDisableFlag) return
    if (loadFlag) return
    setLoadFlag(true)
    claim()
      .on('receipt', (_, receipt) => {
        console.log('claim success')
        setLoadFlag(false)
        message.success('claim success')
      })
      .on('error', (err, receipt) => {
        console.log('claim error', err)
        setLoadFlag(false)
      })
  }

  return (
    <div className="IFO_info">
      <h2 className="IFO_info_title">IFO: Initial Farm Offerings</h2>
      <p className="IFO_info_tip">Buy new tokens with a brand new token sale model.</p>
      <div className="IFO_info_card">
        <div className="IFO_info_card_countdown">
          <div className="IFO_info_card_countdown_box">
            <Timer
              initialTime={leftTime}
              key={leftTime}
              direction='backward'
            >


            <div className="IFO_info_card_countdown_timer">
              <p className="day">HOURS</p>
              <p>
                <span className="timer">
                   <Timer.Consumer>
                    {({ h, d }) =>
                      parseInt(((d * 24 + h) / 10).toString()) * 1 > 0 ? parseInt((((d * 24 + h) / 10).toString())) : '0'
                    }
                  </Timer.Consumer>
                </span>
                <span className="timer">
                   <Timer.Consumer>
                    {({ h, d }) =>
                      ((d * 24 + h) / 10).toString().split('.')[1]
                        ? ((d * 24 + h) / 10).toString().split('.')[1]
                        : '0'
                    }
                  </Timer.Consumer>
                </span>
              </p>
            </div>
            <span className="delimiter">:</span>
            <div className="IFO_info_card_countdown_timer">
              <p className="day">MINUTES</p>
              <p>
                <span className="timer">
                   <Timer.Consumer>
                    {({ m, h }) =>
                      parseInt((m / 10).toString()) * 1 > 0 ? parseInt((m / 10).toString()) : '0'
                    }
                  </Timer.Consumer>
                </span>
                <span className="timer">
                  <Timer.Consumer>
                    {({ m, h }) =>
                      (m / 10).toString().split('.')[1]
                        ? (m / 10).toString().split('.')[1]
                        : '0'
                    }
                  </Timer.Consumer>
                </span>
              </p>
            </div>
              <span className="delimiter">:</span>
              <div className="IFO_info_card_countdown_timer">
                <p className="day">SECONDS</p>
                <p>
                <span className="timer">
                   <Timer.Consumer>
                    {({ s, m, h }) =>
                      parseInt((s / 10).toString()) * 1 > 0 ? parseInt((s / 10).toString()) : '0'
                    }
                  </Timer.Consumer>
                </span>
                  <span className="timer">
                  <Timer.Consumer>
                    {({ s, m, h }) =>
                      (s / 10).toString().split('.')[1]
                        ? (s / 10).toString().split('.')[1]
                        : '0'
                    }
                  </Timer.Consumer>
                </span>
                </p>
              </div>
              </Timer>
          </div>
          {renderStatus(info)}
        </div>
        <div className="IFO_info_card_content">
          <div className="pureswap_link">
            <div className="pureswap_title">
              <img src={Pureswap} alt="" />
              <p>PureSwap(Pure)</p>
            </div>
            <a href="https://www.pureswap.finance/" target='_blank' rel="noreferrer" className="pure_address">
              Learn more about PureSwap(Pure)
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1281"
                width="14"
                height="14"
              >
                <path
                  d="M424.96 128v87.04H215.04v599.04h599.04v-215.04h87.04v256c0 25.6-20.48 40.96-40.96 40.96H168.96c-25.6 0-40.96-20.48-40.96-40.96V168.96c0-25.6 20.48-40.96 40.96-40.96h256z m327.68 87.04h-194.56V128h343.04v343.04h-87.04V271.36L512 573.44 450.56 512l302.08-296.96z"
                  p-id="1282"
                />
              </svg>
            </a>
            <a href="https://www.pureswap.finance/" target='_blank' rel="noreferrer" className="pure_address">
              Check PureSwap(Pure) Contract Address{' '}
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1281"
                width="14"
                height="14"
              >
                <path
                  d="M424.96 128v87.04H215.04v599.04h599.04v-215.04h87.04v256c0 25.6-20.48 40.96-40.96 40.96H168.96c-25.6 0-40.96-20.48-40.96-40.96V168.96c0-25.6 20.48-40.96 40.96-40.96h256z m327.68 87.04h-194.56V128h343.04v343.04h-87.04V271.36L512 573.44 450.56 512l302.08-296.96z"
                  p-id="1282"
                />
              </svg>
            </a>
            <p className="pure_address">
              Add to MetaMask
              <span className="metaMask_logo" />
            </p>
            <a href="https://www.pureswap.finance/" target='_blank' rel="noreferrer" className="pure_address">
              Check PureSwap IFO Contract Address{' '}
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1281"
                width="14"
                height="14"
              >
                <path
                  d="M424.96 128v87.04H215.04v599.04h599.04v-215.04h87.04v256c0 25.6-20.48 40.96-40.96 40.96H168.96c-25.6 0-40.96-20.48-40.96-40.96V168.96c0-25.6 20.48-40.96 40.96-40.96h256z m327.68 87.04h-194.56V128h343.04v343.04h-87.04V271.36L512 573.44 450.56 512l302.08-296.96z"
                  p-id="1282"
                />
              </svg>
            </a>
            <a href="https://www.pureswap.finance/" target='_blank' rel="noreferrer" className="pure_address">
              Website: https://www.pure.swap{' '}
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1281"
                width="14"
                height="14"
              >
                <path
                  d="M424.96 128v87.04H215.04v599.04h599.04v-215.04h87.04v256c0 25.6-20.48 40.96-40.96 40.96H168.96c-25.6 0-40.96-20.48-40.96-40.96V168.96c0-25.6 20.48-40.96 40.96-40.96h256z m327.68 87.04h-194.56V128h343.04v343.04h-87.04V271.36L512 573.44 450.56 512l302.08-296.96z"
                  p-id="1282"
                />
              </svg>
            </a>
            <ul>
              <li>
                <a href="https://twitter.com/Pureswap1" rel="noreferrer" target="_blank">
                  <svg
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2000"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M512 938.656C276.352 938.656 85.344 747.648 85.344 512S276.352 85.344 512 85.344 938.656 276.352 938.656 512 747.648 938.656 512 938.656z m256-589.344c-19.2 8.704-39.552 14.4-60.352 16.96a107.584 107.584 0 0 0 46.208-59.584 206.848 206.848 0 0 1-66.72 26.144 103.2 103.2 0 0 0-126.304-21.44c-41.984 23.04-63.584 72.128-52.672 119.616-84.48-4.352-163.2-45.248-216.512-112.512a109.344 109.344 0 0 0-14.208 54.144c0 37.344 18.528 70.304 46.72 89.6a102.752 102.752 0 0 1-47.584-13.44v1.344c0 51.232 35.264 95.392 84.256 105.568a103.264 103.264 0 0 1-47.456 1.856c13.76 43.84 53.184 73.92 98.112 74.784A207.168 207.168 0 0 1 256 676.928a291.904 291.904 0 0 0 160.992 48.416c193.248 0 298.912-164.064 298.912-306.368 0-4.64-0.128-9.312-0.32-13.888A216.416 216.416 0 0 0 768 349.344z"
                      p-id="2001"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a href="https://t.me/pureswap_en" rel="noreferrer" target="_blank">
                  <svg
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2134"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M512 938.656C276.352 938.656 85.344 747.648 85.344 512S276.352 85.344 512 85.344 938.656 276.352 938.656 512 747.648 938.656 512 938.656zM379.296 561.92l0.576-0.32 37.12 122.464c4.768 13.28 11.328 15.68 19.328 14.56 8-1.056 12.224-5.376 17.472-10.4l50.688-48.992 108.8 80.544c19.904 10.976 34.176 5.312 39.136-18.432l70.72-333.728c7.776-31.04-5.856-43.52-29.984-33.6L277.888 494.4c-28.32 11.328-28.16 27.2-5.12 34.24l106.56 33.28v-0.032z"
                      p-id="2135"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="IFO_info_card_stake">
            <h2>Unlimited Sale</h2>
            <p className="stake_content">
              <span className="stake_title">Total Releases:</span>
              <span className="stake_value">{info && formatAmount(info.totalPurchasedAmount, info.currency.decimal, 2)}</span>
            </p>
            <p className="stake_content">
              <span className="stake_title">Ratio</span>
              <span className="stake_value">{info && info.ratio}</span>
            </p>
            <p className="stake_content">
              <span className="stake_title">progress</span>
              <span className="stake_value">{info && (info.progress * 100).toFixed(0)}%</span>
            </p>
            <p className="progress">
              <span className="complete_schedule" style={{ width: `${info && info.progress > 1 ? 100 : info.progress * 100}%` }} />
              <span className="complete_schedule_point" style={{ left: `${info && info.progress > 1 ? 100 : info.progress * 100}%` }} />
            </p>
            <p className="stake_content">
              <span className="stake_title">Available (LP Token)</span>
              <span className="stake_value">{formatAmount(balance)} {info.currency.symbol}</span>
            </p>
            <input value={amount} onChange={onChange} className="stake_input" placeholder='Input Amount' />
            <a className="stake_content" rel="noreferrer" href="https://exchange.pureswap.finance/#/add/BNB/0x481F0557FB3BB5eE461FD47F287b1ca944aD89bc" target='_blank'>
              <span className="stake_title get_lp_token">Get more LPT(Pure-BNB LP Token)</span>
              <span />
            </a>
            {!isApprove && (<Button type="primary" onClick={onApprove} loading={approveLoadFlag}>
              Approve
            </Button>)
            }
            {isApprove && (<Button type="primary" className={confirmDisableFlag ? 'disableBtn' : ''} onClick={onConfirm} loading={approveLoadFlag}>
              Confirm
            </Button>)
            }
          </div>
          <div className="IFO_info_card_stake">
            <h2>Claim</h2>
            <p className="stake_content">
              <span className="stake_title">My LPT</span>
              {
                info && info.purchasedCurrencyOf.toString() > 0 && (<span className="stake_value">{fromWei(info.purchasedCurrencyOf).toFixed(6, 1)} {info.currency.symbol}</span>)
              }
              {
                info && !(info.purchasedCurrencyOf.toString() > 0) && (<span className="stake_value">-</span>)
              }
            </p>
            <p className="stake_content">
              <span className="stake_title">Winning Rate</span>

              {info && info.settleable && info.purchasedCurrencyOf.toString() > 0 &&
              <span className="stake_value">{fromWei(info.settleable.rate).multipliedBy(new BigNumber(100)).toFixed(2, 1).toString() }%</span>}

              {info && !info.settleable && !(info.purchasedCurrencyOf.toString() > 0) && (<span className="stake_value">-</span>)}
            </p>
            <p className="stake_content">
              <span className="stake_title">Token Get</span>
              {
                (info && info.purchasedCurrencyOf.toString() > 0 &&  (
                  <span className="stake_value">{ new BigNumber(Web3.utils.fromWei(info.purchasedCurrencyOf, 'ether'))
                  .multipliedBy(
                    new BigNumber(
                      Web3.utils.fromWei(info.settleable.rate, 'ether')
                    )
                  )
                  .dividedBy(new BigNumber(info.price))
                  .toFixed(6, 1)
                  .toString()}</span>))
              }
              {
                (info && !(info.purchasedCurrencyOf.toString() > 0) &&  (
                  <span className="stake_value">-</span>))
              }

            </p>
            <p className="dividing_line" />
            <p className="stake_content">
              <span className="stake_title">Unused LPT</span>
              {
                info && info.purchasedCurrencyOf.toString() > 0 && (
                  <span className="stake_value">
                    {info.settleable && formatAmount(info.settleable.amount) } {info.currency.symbol}&nbsp;
                    {
                      info.settleable && info.settleable.amount > 0 && now >= info.timeClose && now < info.time && (
                        <Button className="claim_btn" onClick={(e) => onClaim(e, info)}>claim</Button>
                      )
                    }

                 </span>)
              }
              {
                info && !(info.purchasedCurrencyOf.toString() > 0) && (
                  <span className="stake_value">-</span>
                )
              }

            </p>
            <p className="stake_content claim_box">
              <span className="stake_title">Pure</span>
              <span className="stake_value">{info && info.settleable && info.settleable.volume * 1 > 0 ? formatAmount(info.settleable.volume) : '-'}</span>
            </p>
            <Button type="primary" className={claimDisableFlag ? 'disableBtn' : ''} onClick={(e) => onClaim(e, info)} loading={loadFlag}>
              Claim
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default IFOCard
