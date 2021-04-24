import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'PURE-BNB LP',
    lpAddresses: {
      56: '0xE079424a4Fef5c547478a85802B462E4699b0fa9',
      97: '0xF741B8feCbC9050f4eeB3BDe43a005220F3f26a5',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      56: '0x481F0557FB3BB5eE461FD47F287b1ca944aD89bc',
      97: '0xCf11ddcd9b0f6e9C70aAFf9F8D3548A8B13C620e',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'PURE-MX LP',
    lpAddresses: {
      56: '0xFdbF0A6233a9b3AAaf294E39b5cdD9b119F0976c',
      97: '0x5070Fa9445201e85ffC503Faf11Cf3439fc7F80b',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      56: '0x481F0557FB3BB5eE461FD47F287b1ca944aD89bc',
      97: '0xCf11ddcd9b0f6e9C70aAFf9F8D3548A8B13C620e',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 2,
    lpSymbol: 'MX-BNB LP',
    lpAddresses: {
      56: '0x984648bd05103fDE7ec448512da1F3A44F1B0B30',
      97: '0xbB6B94957A19077a1253A771aAC82B1a5666a25a',
    },
    tokenSymbol: 'MX',
    tokenAddresses: {
      56: '0x9F882567A62a5560d147d64871776EeA72Df41D3',
      97: '0x31eaa81bE568F3138C5aC73feEEd99eb327F1cEb',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 14,
    lpSymbol: 'SAFEMARS-PURE LP',
    lpAddresses: {
      56: '0xa13877b015357cE230F765699A88952d246338B5',
      97: '0xa13877b015357cE230F765699A88952d246338B5',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      56: '0x481F0557FB3BB5eE461FD47F287b1ca944aD89bc',
      97: '0xCf11ddcd9b0f6e9C70aAFf9F8D3548A8B13C620e',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 15,
    lpSymbol: 'PIG-PURE LP',
    lpAddresses: {
      56: '0x32b06a9ff9C344141E27b940c4A718EF415a10e8',
      97: '0x32b06a9ff9C344141E27b940c4A718EF415a10e8',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      56: '0x481F0557FB3BB5eE461FD47F287b1ca944aD89bc',
      97: '0xCf11ddcd9b0f6e9C70aAFf9F8D3548A8B13C620e',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 3,
    lpSymbol: 'PURE-BUSD LP',
    lpAddresses: {
      56: '0x451A1fFA22c39A14E55803258d86FC795F30De7a',
      97: '0x859D0C141d3D8da474eDa064E2d07C65C5AbB7b2',
    },
    tokenSymbol: 'PURE',
    tokenAddresses: {
      56: '0x481F0557FB3BB5eE461FD47F287b1ca944aD89bc',
      97: '0xCf11ddcd9b0f6e9C70aAFf9F8D3548A8B13C620e',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    lpSymbol: 'MX-BUSD LP',
    lpAddresses: {
      56: '0xeFb83ba7589Cd602f621463C80A466e884744CD4',
      97: '0x8A18d35f4994F8a95C83b73734308f08Ea446672',
    },
    tokenSymbol: 'MX',
    tokenAddresses: {
      56: '0x9F882567A62a5560d147d64871776EeA72Df41D3',
      97: '0x31eaa81bE568F3138C5aC73feEEd99eb327F1cEb',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 5,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      56: '0xca7A9690F0B49c687ab6054fa1f5622d89e874eE',
      97: '0x0443Bf68431EEcBA541fC6f82378d3867c9C51f2',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      97: '0x457439cd966C0adCC9160DfD9DeEdc265F5ce8EA',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 6,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      56: '0x37126Fdd05C8B6FF7A1bd0A24223E9414b6cC219',
      97: '0x446a460ED845881F445b9570a100879039fD69a8',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      56: '0x55d398326f99059ff775485246999027b3197955',
      97: '0x1A63e506D0E867a1C43845F056D057a9130828b2',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 7,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      56: '0xDbb13ef5adC8E41f06a0277E0B4c70c6775BC788',
      97: '0x5899f4dD6A0A6BdBA7169a84934F4D1a3cb8426B',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
      97: '0xA65785A9aaD0092a6033c530B2a8C010f576F545',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 8,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      56: '0xe69E6A6Eda23eEcEBf5a2856C01344CA7b34685C',
      97: '0xC336af87986e3162CFc220A7587A43f3b733D0a4',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      97: '0xB30f62FF4E006a69D034BF50Ab51E099E518bb30',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 9,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      56: '0x8387dc46f6C9ef58E4D761F01647331f1FF65CC0',
      97: '0x13F911a48AE97937C5bad56C074CD02776F3B757', // 1
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
      97: '0xAc3439A61926a390A20B72A711fD21211F02Aa83',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 10,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      56: '0x77Bf460aB1393C564a834f9733Bbe8A27D268cb3',
      97: '0x320901b97cAE7841964B85675AC255b1ECB99f86', // 1
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
      97: '0xAd989D1a660343aa4dB629E9bb0e8861ab98b29A',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 11,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      56: '0x18287642a6a675502c2CdFF515c0838626Ca36aF',
      97: '0x013F31938cFcBE4D2342cd26235Ee27cF4C894e0',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      97: '0x570C575835540a742602B6Df19984F57E46EB2f3',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 12,
    lpSymbol: 'XVS-BNB LP',
    lpAddresses: {
      56: '0x45B196696175F7b07917de64eacB5d4D83D8fc21',
      97: '0xf6D6Bfce89f4B1458A1F320673a3b08a28F48DeC',
    },
    tokenSymbol: 'XVS',
    tokenAddresses: {
      56: '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
      97: '0x6423a43272642A99c2eC9736aF3BB7B702f480af',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 13,
    lpSymbol: 'AUTO-BNB LP',
    lpAddresses: {
      56: '0xB988051a95a3f8a7a7B13eB56a28464538F2cBfd',
      97: '0xe91a67A9c135862e3f7F1d382649aa0CFAD144F9',
    },
    tokenSymbol: 'AUTO',
    tokenAddresses: {
      56: '0xa184088a740c695e156f91f5cc086a06bb78b827',
      97: '0x394c514d07220b4A0974c3BfE2352f9C43fF82a9',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  // {
  //   pid: 0,
  //   lpSymbol: 'Pure',
  //   lpAddresses: {
  //     56: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
  //     97: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   tokenSymbol: 'SYRUP',
  //   tokenAddresses: {
  //     56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  //     97: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
]

export default farms
