import { Scraper } from './core/scraper'
try {
  const scraper = new Scraper('1', 'test', {
    baseURL: 'https://www.google.com'
  })
  console.log(scraper)
} catch (error) {
  console.log(error)
}