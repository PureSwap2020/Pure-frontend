import { Campaign } from './types'

/**
 * id: The campaign id (required)
 * type: The type of the achievement
 * title: A string or an object to be translated.
 * Note: If the value is a string it is likely used as data in a translation object
 *
 * badge: Achievement avatar
 */

const campaigns: Campaign[] = [
  // {
  //   id: '511060000',
  //   type: 'IFO',
  //   title: 'Berry',
  //   badge: 'IFO-bry.svg',
  // },
  // {
  //   id: '511050000',
  //   type: 'IFO',
  //   title: 'Soteria',
  //   badge: 'IFO-wsote.svg',
  // },
  // {
  //   id: '511040000',
  //   type: 'IFO',
  //   title: 'Helmet',
  //   badge: 'IFO-helmet.svg',
  // },
  {
    id: '511030000',
    type: 'ifo',
    title: 'Tenet',
    badge: 'IFO-ten.svg',
  },
  {
    id: '511020000',
    type: 'ifo',
    title: 'Ditto',
    badge: 'IFO-ditto.svg',
  },
  {
    id: '511010000',
    type: 'ifo',
    title: 'Blink',
    badge: 'IFO-blk.svg',
  },
]

/**
 * Transform the campaign config into a map. Keeps the config the same
 * as the others and allows easy access to a campaign by id
 */
export const campaignMap = new Map<string, Campaign>()

campaigns.forEach((campaign) => {
  campaignMap.set(campaign.id, campaign)
})

export default campaigns
