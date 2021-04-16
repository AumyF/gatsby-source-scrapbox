import {
  CreateSchemaCustomizationArgs,
  PluginOptions,
  PluginOptionsSchemaArgs,
  SourceNodesArgs,
} from "gatsby";

import { fetchPages } from "./lib/fetch-pages";
import { Node } from "./lib/node";

export type SourceScrapboxOptions = Readonly<{
  limit?: number;
  projectName: string;
  skip?: number;
}>;

export const sourceNodes = async (
  { actions, createContentDigest, createNodeId, reporter }: SourceNodesArgs,
  { projectName, ...fetchPagesOptions }: PluginOptions & SourceScrapboxOptions
): Promise<void> => {
  const { createNode } = actions;

  const pagesResponse = await fetchPages(projectName, fetchPagesOptions);

  if (pagesResponse instanceof Error) {
    reporter.panic(pagesResponse);
    return;
  }

  const buildNode = Node({ createContentDigest, createNodeId });

  for (const page of pagesResponse.pages) {
    const node = buildNode(page);
    createNode(node);
  }

  return;
};

export const createSchemaCustomization = ({
  actions: { createTypes },
  schema,
}: CreateSchemaCustomizationArgs): void => {
  const typedefs = [
    schema.buildObjectType({
      name: `ScrapboxPage`,
      interfaces: [`Node`],
      fields: {
        accessed: "Int!",
        commitId: "String!",
        created: "Int!",
        descriptions: "[String!]!",
        image: "String",
        linked: "Int!",
        pageRank: "Int!",
        pin: "String!",
        snapshotCreated: "Int!",
        title: "String!",
        updated: "Int!",
        // user: "ScrapboxUser!",
        views: "Int!",
      },
    }),
  ];
  createTypes(typedefs);
};

export const pluginOptionsSchema = ({
  Joi,
}: PluginOptionsSchemaArgs): unknown => {
  return Joi.object<SourceScrapboxOptions>({
    projectName: Joi.string()
      .required()
      .description(`The project name following https://scrapbox.io/`),
    skip: Joi.number().description(`Number of pages to skip fetching`),
    limit: Joi.number().description(`Maximum number of pages to fetch`),
  });
};
