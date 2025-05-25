import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import UserAgent from 'user-agents'
import { PrismaService } from '~/services/prismaService'
import { RequireAtLeastOne } from '~/types/utils'

puppeteer.use(StealthPlugin())
/**
 * A class for web scraping with a pre-configured Axios instance.
 * @param id - Unique identifier for the scraper.
 * @param name - Human-readable name for the scraper.
 * @param axiosConfig - Axios configuration, must include baseURL.
 */
export class Scraper {
  client: AxiosInstance
  id: string
  name: string
  baseURL: string
  userAgentGenerator: UserAgent
  #prismaService: PrismaService
  constructor(id: string, name: string, axiosConfig: RequireAtLeastOne<AxiosRequestConfig, 'baseURL'>) {
    const config = {
      headers: {
        referer: axiosConfig.baseURL,
        origin: axiosConfig.baseURL,
        'User-Agent': new UserAgent().toString(),
        ...axiosConfig.headers
      },
      timeout: 20000,
      ...axiosConfig
    }
    this.client = axios.create(config)
    this.baseURL = axiosConfig.baseURL
    this.id = id
    this.name = name
    this.userAgentGenerator = new UserAgent()
    this.#prismaService = new PrismaService()
  }

  async init() {
    await this.#prismaService.onModuleInit()
  }
}
