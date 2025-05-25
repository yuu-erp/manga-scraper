import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import puppeteer from 'puppeteer-extra';
import UserAgent from 'user-agents';
import { RequireAtLeastOne } from '~/types/utils';
import validateUrl from '~/utils/validate-url';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());
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
    this.client = axios.create(config);
    this.baseURL = axiosConfig.baseURL
    this.id = id;
    this.name = name;
    this.userAgentGenerator = new UserAgent();
    this.#validate()
  }

  protected async scrapePages(scrapeFn: (page: number) => Promise<void>, numOfPages: number) {

  }


  #validate() {
    if (!validateUrl(this.baseURL)) {
      throw new Error('Invalid baseURL')
    }
  }
}
