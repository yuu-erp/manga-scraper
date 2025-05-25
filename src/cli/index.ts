import { Command } from 'commander'
import fs from 'fs'
import handlePath from '~/utils/handle-file'

const program = new Command()

program.name('Scraper').description('CLI for scraper').version('1.0.0')

const commandFiles = fs.readdirSync(handlePath('./commands', __dirname)).filter((file) => file.endsWith('.ts'))
for (const file of commandFiles) {
  const { default: command } = require(handlePath(`./commands/${file}`, __dirname))
  command(program)
}

program.parse()
