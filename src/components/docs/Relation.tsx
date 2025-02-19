/* eslint-disable @next/next/no-img-element */
// import Image, { ImageProps } from "next/image";
import { A, HrefType } from "../common";
import mapChildren from "@/utils/mapChildren";
import { isString } from "lodash";
import IconFont from "../common/IconFont";
import { ImgHTMLAttributes } from "react";

type RelationProps = {
  title: string;
  link: HrefType;
  tags: { icon: React.ReactNode; label: string }[];
  logo: ImgHTMLAttributes<HTMLImageElement>;
  content: React.ReactNode;
};

export function Relation(props: RelationProps) {
  const { logo, title, link, tags, content } = props;
  return (
    <div
      data-testid="Realtion"
      className="mt-4 rounded-lg border border-[#ccc] px-2 pt-2 first:mt-0 md:px-4"
    >
      <div className="block sm:flex sm:items-start">
        {/* <Image width={70} height={70} {...logo} alt={logo.alt || title} /> */}
        <img
          className="float-left my-0 mr-4 sm:float-none"
          width={70}
          height={70}
          {...logo}
          alt={logo.alt || title}
        />
        <div>
          <A href={link} className="underline hover:no-underline">
            <h5>{title}</h5>
          </A>

          {tags && tags.length ? (
            <div
              data-testid="tags"
              className="flex w-full flex-wrap gap-1 pt-2 sm:w-auto sm:pt-0"
            >
              {mapChildren(tags, ({ item, key }) => (
                <span
                  key={key}
                  className="shadow-[inset 0 0 0 1px #444d56] inline-flex items-center rounded-xl bg-[#24292e] px-1.5 py-px text-12 text-[#bebebe]"
                >
                  {isString(item.icon) ? (
                    <IconFont className="mr-1" type={item.icon as any} />
                  ) : (
                    item.icon
                  )}
                  {item.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div data-testid="Relation-Content">{content}</div>
    </div>
  );
}
