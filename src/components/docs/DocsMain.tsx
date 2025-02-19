import { Docs } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { A } from "../common";
import Image from "next/image";
import { DocsNavigation } from "./DocsNavigation";
import { useDocsLayout } from "../layouts/DocsLayout/container";
import { DocsHeader } from "./DocsHeader";
import { H2, H3, H4 } from "./Headings";
import { Relation } from "./Relation";

const Section = (props: { children: React.ReactNode }) => (
  <div>{props.children}</div>
);

const mdxComponents = {
  // 通用组件
  h2: H2,
  h3: H3,
  h4: H4,
  a: A,
  Link: A,
  Image,
  img: Image,

  // 扩展组件
  Callout: Section,
  Card: Section,
  Relation: Relation,
  ChevronLink: A,
  Label: Section,
  OptionsTable: Section,
  OptionTitle: Section,
  OptionDescription: Section,
};

export function DocsMain() {
  const { doc, tree } = useDocsLayout();
  const MDXContent = useMDXComponent(doc.body.code || "");

  return (
    <div className="relative mr-auto w-full max-w-screen-2xl lg:flex lg:items-start">
      <div
        data-testid="DocsSidebar"
        style={{ height: "calc(100vh - 64px)" }}
        className="sticky top-16 hidden shrink-0 border-r border-gray-200 bg-secondary dark:border-gray-800 lg:block"
      >
        <div className="-ml-3 h-full overflow-y-scroll p-8 pl-16">
          <DocsNavigation />
        </div>
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
      </div>

      <div className="relative w-full grow">
        <DocsHeader title={doc.title} />
        <div className="docs prose prose-slate prose-violet mx-auto mb-4 w-full shrink p-4 pb-8 text-16 dark:prose-invert prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-gray-200 dark:prose-a:text-violet-400 dark:prose-hr:border-gray-800 md:mb-8 md:max-w-3xl md:px-8 lg:mx-0 lg:max-w-full lg:px-16">
          {MDXContent && <MDXContent components={mdxComponents as any} />}
          {/* {doc.show_child_cards && (
            <>
              <hr />
              <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
                {childrenTree.map((card: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => router.push(card.urlPath)}
                    className="cursor-pointer"
                  >
                    <ChildCard className="h-full p-6 py-4 hover:border-violet-100 hover:bg-violet-50 dark:hover:border-violet-900/50 dark:hover:bg-violet-900/20">
                      <h3 className="mt-0 no-underline">{card.title}</h3>
                      {card.label && <Label text={card.label} />}
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        <p>{card.excerpt}</p>
                      </div>
                    </ChildCard>
                  </div>
                ))}
              </div>
            </>
          )}
          <DocsFooter doc={doc} /> */}
        </div>
      </div>
      <div
        style={{ maxHeight: "calc(100vh - 128px)" }}
        className="1.5xl:block sticky top-32 hidden w-80 shrink-0 overflow-y-scroll p-8 pr-16"
      >
        {/* <PageNavigation headings={doc.headings} /> */}
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
      </div>
    </div>
  );
}
