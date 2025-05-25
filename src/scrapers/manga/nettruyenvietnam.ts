import { ManageScraper } from '~/core/manage-scraper'

export default class Nettruyenvietnam extends ManageScraper {
  constructor() {
    super('nettruyenvietnam', 'Nettruyenvietnam', {
      baseURL: 'https://nettruyenvietnam.com'
    })
  }
}