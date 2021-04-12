import { filter } from "fp-ts/lib/Array";
import { left } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import {
  nullType,
  number,
  readonly,
  readonlyArray,
  string,
  type,
  TypeOf,
  union,
  Validation,
} from "io-ts";
import fetch from "node-fetch";
import { URL, URLSearchParams } from "url";

const User = readonly(type({ id: string }, "mutableUser"), "User");

const Page = readonly(
  type(
    {
      accessed: number,
      commitId: string,
      created: number,
      descriptions: readonlyArray(string),
      id: string,
      image: union([string, nullType]),
      linked: number,
      pageRank: number,
      pin: number,
      snapshotCreated: union([number, nullType]),
      title: string,
      updated: number,
      user: User,
      views: number,
    },
    "mutablePage"
  ),
  "Page"
);

const PagesResponse = readonly(
  type(
    {
      count: number,
      limit: number,
      pages: readonlyArray(Page),
      projectName: string,
      skip: number,
    },
    "mutablePagesResponse"
  ),
  "PagesResponse"
);

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Scrapbox {
  export type PagesResponse = TypeOf<typeof PagesResponse>;

  export type PagesOptions = Readonly<{ limit: number; skip: number }>;

  export type Page = TypeOf<typeof Page>;
  export type User = TypeOf<typeof User>;
}

export const fetchPages = (
  projectName: string,
  options: Partial<Scrapbox.PagesOptions> = {}
): Promise<Validation<Scrapbox.PagesResponse>> => {
  const params = constructUrlParams(isNonNullish)(options);
  const requestUrl = new URL(
    `https://scrapbox.io/api/pages/${projectName}?${params.toString()}`
  );
  return fetch(requestUrl)
    .then((response) => response.json())
    .then(PagesResponse.decode)
    .catch(left);
};

const isNonNullish = <T>(t: T): t is NonNullable<T> => t != null;

const constructUrlParams = (predicate: (value: unknown) => boolean) => (
  a: Partial<Record<string, unknown>>
) =>
  pipe(
    a,
    Object.entries,
    filter(([, value]) => predicate(value)),
    Object.fromEntries,
    construct(URLSearchParams)
  );

const construct = <A extends readonly unknown[], R>(
  constructor: new (...args: A) => R
) => (...args: A) => new constructor(...args);
