import { defineDocumentType } from "contentlayer/source-files";
import { getLastEditedDate, urlFromFilePath } from "../utils";
import { bundleMDX } from "mdx-bundler";
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxToMarkdown } from "mdast-util-mdx";
import { commonFields, computedFields } from "../fields";
import * as unified from "unified";

export type DocHeading = { level: 1 | 2 | 3; title: string };

const tocPlugin =
  (headings: DocHeading[]): unified.Plugin =>
  () => {
    return (node: any) => {
      for (const element of node.children.filter(
        (_: any) => _.type === "heading" || _.name === "OptionsTable"
      )) {
        if (element.type === "heading") {
          const title = toMarkdown(
            { type: "paragraph", children: element.children },
            { extensions: [mdxToMarkdown()] }
          )
            .trim()
            .replace(/<.*$/g, "")
            .replace(/\\/g, "")
            .trim();
          headings.push({ level: element.depth, title });
        } else if (element.name === "OptionsTable") {
          element.children
            .filter((_: any) => _.name === "OptionTitle")
            .forEach((optionTitle: any) => {
              optionTitle.children
                .filter((_: any) => _.type === "heading")
                .forEach((heading: any) => {
                  const title = toMarkdown(
                    { type: "paragraph", children: heading.children },
                    { extensions: [mdxToMarkdown()] }
                  )
                    .trim()
                    .replace(/<.*$/g, "")
                    .replace(/\\/g, "")
                    .trim();
                  headings.push({ level: heading.depth, title });
                });
            });
        }
      }
    };
  };

export const Docs = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: commonFields,
  computedFields: {
    ...computedFields,
    pathSegments: {
      type: "json",
      resolve: (doc) =>
        urlFromFilePath(doc)
          .split("/")
          // skip `/docs` prefix
          .slice(2)
          .map((dirName) => {
            const re = /^((\d+)-)?(.*)$/;
            const [, , orderStr, pathName] = dirName.match(re) ?? [];
            const order = orderStr ? parseInt(orderStr) : 0;
            return { order, pathName };
          }),
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const headings: DocHeading[] = [];

        await bundleMDX({
          source: doc.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [
              ...((opts.remarkPlugins ?? []) as any[]),
              tocPlugin(headings),
            ];
            return opts;
          },
        });

        return [{ level: 1, title: doc.title }, ...headings];
      },
    },
    last_edited: { type: "date", resolve: getLastEditedDate },
  },
}));
