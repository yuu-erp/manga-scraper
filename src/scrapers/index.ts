import fs from 'fs'
import { ManageScraper } from '~/core/manage-scraper'
import handlePath from '~/utils/handle-file'

export type MangaScraperId = string

const readScrapers = (path: string) => {
  const scraperFiles = fs
    .readdirSync(handlePath(path))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => file.replace('.ts', ''))

  const scrapers: Record<MangaScraperId, ManageScraper> = {}

  for (const file of scraperFiles) {
    const { default: Scraper } = require(handlePath(`${path}/${file}.ts`))
    scrapers[file] = new Scraper()
  }
  return scrapers
}

const mangaScrapers: Record<MangaScraperId, ManageScraper> = readScrapers('./scrapers/manga')

export default { manga: mangaScrapers }
