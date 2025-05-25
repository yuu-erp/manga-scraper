import fs from 'fs'
import { ManageScraper } from '~/core/manage-scraper'
import handlePath from '~/utils/handle-file'

export type MangaScraperId = string
export type AnimeScraperId = string
export type LightNovelScraperId = string

export type ScraperType = 'manga' | 'anime' | 'lightNovel'

const readScrapers = (path: string): Record<MangaScraperId | AnimeScraperId | LightNovelScraperId, ManageScraper> => {
  const scraperFiles = fs
    .readdirSync(handlePath(path))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => file.replace('.ts', ''))

  const scrapers: Record<MangaScraperId | AnimeScraperId | LightNovelScraperId, ManageScraper> = {}

  for (const file of scraperFiles) {
    const { default: Scraper } = require(handlePath(`${path}/${file}.ts`))
    scrapers[file] = new Scraper()
  }
  return scrapers
}

const mangaScrapers: Record<MangaScraperId, ManageScraper> = readScrapers('./scrapers/manga')
const animeScrapers: Record<AnimeScraperId, ManageScraper> = readScrapers('./scrapers/anime')
const lightNovelScrapers: Record<LightNovelScraperId, ManageScraper> = readScrapers('./scrapers/lightNovel')

const getAnimeScraper = (id: AnimeScraperId) => {
  return animeScrapers[id]
}

const getMangaScraper = (id: MangaScraperId) => {
  return mangaScrapers[id]
}

const getLightNovelScraper = (id: LightNovelScraperId) => {
  return lightNovelScrapers[id]
}

export const getScraper = (id: AnimeScraperId | MangaScraperId | LightNovelScraperId) => {
  if (id in animeScrapers) {
    return getAnimeScraper(id)
  }

  if (id in mangaScrapers) {
    return getMangaScraper(id)
  }

  if (id in lightNovelScrapers) {
    return getLightNovelScraper(id)
  }

  throw new Error(`Unknown scraper id: ${id}`)
}

export default { manga: mangaScrapers, anime: animeScrapers, lightNovel: lightNovelScrapers }
