import type { NodeInput, SourceNodesArgs } from "gatsby";

import type { Scrapbox } from "./types";

interface ScrapboxPageNodeInput extends NodeInput {
  readonly url: `https://scrapbox.io/api/${string}`;
}

export const Node = ({
  createContentDigest,
  createNodeId,
}: Pick<SourceNodesArgs, "createNodeId" | "createContentDigest">) => (
  page: Scrapbox.Page
): ScrapboxPageNodeInput => {
  const nodeData = {
    ...page,
    // TODO: This `as const` can be removed in TS 4.3
    url: `https://scrapbox.io/api/${encodeURIComponent(page.title)}` as const,
  };
  const nodeContent = JSON.stringify(nodeData);
  const nodeMeta = {
    id: createNodeId(`scrapbox-page-${nodeData.id}`),
    parent: null,
    children: [],
    internal: {
      type: `ScrapboxPage`,
      mediaType: `text/plain`,
      content: nodeContent,
      contentDigest: createContentDigest(nodeData),
    },
  };

  const node = Object.assign({}, nodeData, nodeMeta);

  return node;
};
