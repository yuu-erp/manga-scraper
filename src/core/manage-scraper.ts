import { AxiosRequestConfig } from "axios";
import { Scraper } from "./scraper";
import { RequireAtLeastOne } from "~/types/utils";

export class ManageScraper extends Scraper {
    constructor(
        id: string,
        name: string,
        axiosConfig: RequireAtLeastOne<AxiosRequestConfig, 'baseURL'>,
      ) {
        super(id, name, axiosConfig);
    }
}
