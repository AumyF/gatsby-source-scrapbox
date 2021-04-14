import fetch from "node-fetch";
import { URL } from "url";

import type { Scrapbox } from "./types";
import { constructUrlParams } from "./utils";

export const fetchPages = (
  projectName: string,
  options: Partial<Scrapbox.PagesOptions> = {}
): Promise<Scrapbox.PagesResponse | Error> => {
  const params = constructUrlParams(options);
  const requestUrl = new URL(
    `https://scrapbox.io/api/pages/${projectName}?${params.toString()}`
  );
  return fetch(requestUrl)
    .then((response) => response.json() as Promise<Scrapbox.PagesResponse>)
    .catch((e: Error) => e);
};
