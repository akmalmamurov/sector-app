import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { getNewsById } from "@/api/news";
import NewsCalendar from "@/assets/icons/NewsCalendar";
import Image from "next/image";
import { DOMAIN } from "@/constants";
import React from "react";
import { Metadata } from "next";

interface Block {
  id: string;
  type: string;
  data?: {
    text?: string;
    level?: number;
    style?: string;
    items?: {
      content: string;
    }[];
    caption?: string;
  };
}

type Props = {
  params: { slug: string };
};

export const metadata: Metadata = {
  title: "Акции, распродажи и скидки | Sector App",
  description: "Акции, распродажи и скидки",
};

interface EditorData {
  blocks: Block[];
}
export default async function NewsDetailPage({ params }: Props) {
  const { slug } = params;
  const newData = await getNewsById(slug);

  let editorContent: React.ReactNode = null;
  try {
    const descObj = JSON.parse(
      typeof newData.fullDescription === "string"
        ? newData.fullDescription
        : "{}"
    );
    editorContent = renderEditorBlocks(descObj, newData?.fullDescriptionImages);
  } catch (error) {
    console.log("Parsing fullDescription error:", error);
    editorContent = newData.fullDescription;
  }

  function renderEditorBlocks(editorJson: EditorData, fullImages: string[]) {
    if (!editorJson?.blocks || !Array.isArray(editorJson.blocks)) {
      return null;
    }
    let imageIndex = 0;
    return editorJson.blocks.map((block: Block) => {
      if (!block.data) return null;

      switch (block.type) {
        case "paragraph":
          return (
            <p
              key={block.id}
              dangerouslySetInnerHTML={{ __html: block.data.text || "" }}
            />
          );
        case "header":
          const level = block.data.level || 2;
          const HeaderTag = `h${level}` as
            | `h1`
            | `h2`
            | `h3`
            | `h4`
            | `h5`
            | `h6`;
          return React.createElement(
            HeaderTag,
            { key: block.id },
            block.data.text || ""
          );
        case "list":
          const isOrdered = block.data.style === "ordered";
          const ListTag = isOrdered ? "ol" : "ul";
          return (
            <ListTag key={block.id}>
              {block.data.items?.map(
                (item: { content: string }, idx: number) => (
                  <li
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                )
              )}
            </ListTag>
          );
        case "image": {
          let imageUrl = fullImages[imageIndex] || "";
          imageIndex++;
          if (DOMAIN && !imageUrl.startsWith("http")) {
            imageUrl =
              DOMAIN + (imageUrl.startsWith("/") ? "" : "/") + imageUrl;
          }
          const caption = block.data.caption || "";
          return (
            <div className="flex gap-8 my-4">
              <div key={block.id} className="w-20">
                <div className="relative w-12 h-12">
                  <Image
                    src={imageUrl}
                    alt={caption}
                    fill
                    className="object-cover rounded"
                  />
                  {caption && (
                    <p className="text-center text-sm mt-1 text-textColor">
                      {caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        }
        default:
          return null;
      }
    });
  }
  console.log(editorContent);
  console.log(newData);
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: `${newData?.title}` }]} />
      <Section className="py-6 px-0 shadow-sectionShadow">
        <InfoHeader className="mb-5 flex items-center justify-between gap-4">
          <InfoTitle>{newData?.title}</InfoTitle>
          <div className="flex items-center gap-2">
            <NewsCalendar />
            <p className="text-textColor">
              {new Date(newData?.createdAt).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </InfoHeader>
        {editorContent && (
          <section className="pb-[23px] pt-[10px]">
            <div className="prose max-w-none px-6">{editorContent}</div>
          </section>
        )}
      </Section>
    </Container>
  );
}
