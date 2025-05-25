import { select, Separator } from '@inquirer/prompts'
import { Command } from 'commander'
import scrapers from '~/scrapers'

export default (program: Command) => {
  return program
    .command('scraper')
    .description('Scrape a manga')
    .action(async () => {
      const scraperType = await select({
        message: 'Please select the type of media you want to scrape:',
        choices: [
            {
                name: 'Manga',
                value: 'manga',
                description: 'Scrape a manga from a website'
            },
            new Separator(),
            {
                name: 'Anime',
                value: 'anime',
                disabled: true,
                description: 'Scrape a anime from a website'
            },
            {
                name: 'Light Novel',
                value: 'light-novel',
                disabled: true,
                description: 'Scrape a light novel from a website'
            }
        ]
      })
      const scraperID = await select({
        message: 'Please select the scraper you want to use:',
        choices: [
            ...Object.keys(scrapers.manga).map((scraper) => ({ 
                name: scrapers.manga[scraper].name,
                value: scraper,
                description: `Scrape ${scrapers.manga[scraper].name}`
            })),
            new Separator(),
            {
                name: 'Custom',
                value: 'custom',
                description: 'Scrape a custom website'
            }
        ]
      })    
      console.log(scraperType, scraperID)
    })
}
