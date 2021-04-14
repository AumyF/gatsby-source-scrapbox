import {
  nullType,
  number,
  readonly,
  readonlyArray,
  string,
  type,
  TypeOf,
  union,
} from "io-ts";
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
