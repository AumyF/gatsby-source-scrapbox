import { isLeft } from "fp-ts/lib/Either";
import {
  CreateSchemaCustomizationArgs,
  PluginOptions,
  PluginOptionsSchemaArgs,
  SourceNodesArgs,
} from "gatsby";

import { fetchPages } from "./lib/scrapbox";

export const sourceNodes = async (
  { actions, createContentDigest, createNodeId, reporter }: SourceNodesArgs,
  { projectName }: PluginOptions & { projectName: string }
): Promise<unknown> => {
  const { createNode } = actions;

  const validation = await fetchPages(projectName);

  if (isLeft(validation)) {
    reporter.panic(JSON.stringify(validation.left[0].context));
    return;
  }

  const pagesResponse = validation.right;

  const pages = pagesResponse.pages;

  for (const page of pages) {
    const nodeContent = JSON.stringify(page);
    const nodeMeta = {
      id: createNodeId(`scrapbox-page-${page.id}`),
      parent: null,
      children: [],
      internal: {
        type: `ScrapboxPage`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(page),
      },
    };
    const node = Object.assign({}, page, nodeMeta);

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
        // user: "User!",
        views: "Int!",
      },
    }),
  ];
  createTypes(typedefs);
};

export const pluginOptionsSchema = ({
  Joi,
}: PluginOptionsSchemaArgs): unknown => {
  return Joi.object({
    projectName: Joi.string()
      .required()
      .description(`The project name following https://scrapbox.io/`),
  });
};
