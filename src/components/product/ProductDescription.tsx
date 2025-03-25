"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { DOMAIN } from "@/constants";
import { ProductData } from "@/types";
import { CircleAlert, CirclePlus } from "lucide-react";
import StarIcon from "@/assets/icons/StarIcon";
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

interface EditorData {
  blocks: Block[];
}

const sections = [
  { id: "description", label: "Описание" },
  { id: "specs", label: "Характеристики" },
  { id: "related", label: "Сопутствующие товары" },
  { id: "reviews", label: "Отзывы" },
  { id: "questions", label: "Вопросы" },
];

interface ProductDescriptionProps {
  product: ProductData;
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
            {block.data.items?.map((item: { content: string }, idx: number) => (
              <li
                key={idx}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            ))}
          </ListTag>
        );
      case "image": {
        let imageUrl = fullImages[imageIndex] || "";
        imageIndex++;
        if (DOMAIN && !imageUrl.startsWith("http")) {
          imageUrl = DOMAIN + (imageUrl.startsWith("/") ? "" : "/") + imageUrl;
        }
        const caption = block.data.caption || "";
        return (
          <div key={block.id} className="relative w-1/2 h-64 my-4">
            <Image src={imageUrl} alt={caption} fill className="" />
            {caption && <p className="text-center text-sm mt-2">{caption}</p>}
          </div>
        );
      }
      default:
        return null;
    }
  });
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  const [activeTab, setActiveTab] = useState("description");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  let fullImages: string[] = [];
  if (typeof product.fullDescriptionImages === "string") {
    try {
      fullImages = JSON.parse(product.fullDescriptionImages || "[]");
    } catch (error) {
      console.error("Error parsing fullDescriptionImages:", error);
    }
  } else if (Array.isArray(product.fullDescriptionImages)) {
    fullImages = product.fullDescriptionImages;
  }

  let editorContent: React.ReactNode = null;
  try {
    const descObj = JSON.parse(
      typeof product.fullDescription === "string"
        ? product.fullDescription
        : "{}"
    );
    editorContent = renderEditorBlocks(descObj, fullImages);
  } catch (error) {
    console.log("Parsing fullDescription error:", error);
    editorContent = product.fullDescription;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter out only entries that are intersecting.
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length) {
          // Sort by the distance from the top of the viewport.
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          // The section closest to the top becomes active.
          setActiveTab(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px 0px 0px",
        threshold: 0.5,
      }
    );

    // Observe each section.
    const currentRefs = sectionRefs.current;
    sections.forEach(({ id }) => {
      if (currentRefs[id]) {
        observer.observe(currentRefs[id]!);
      }
    });
    return () => {
      sections.forEach(({ id }) => {
        if (currentRefs[id]) {
          observer.unobserve(currentRefs[id]!);
        }
      });
    };
  }, []);

  const handleTabClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const headerHeight = 138;
      const sectionTop = section.offsetTop - headerHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div>
      <div className="sticky top-[130px] z-[5] bg-white  flex border-b shadow-sectionShadow">
        {sections.map(({ id, label }) => {
          if (id === "description" && !editorContent) return null;
          if (
            id === "specs" &&
            (!product.characteristics || product.characteristics.length === 0)
          )
            return null;
          return (
            <button
              key={id}
              className={`px-5 py-3.5 text-center border-b-2 transition-all relative inline-block ${
                activeTab === id
                  ? "text-cerulean title_gradient"
                  : "border-transparent"
              }`}
              onClick={() => handleTabClick(id)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="bg-whiteOut shadow-sectionShadow p-[23px] ">
        {editorContent && (
          <section
            id="description"
            ref={(el) => {
              if (el) sectionRefs.current.description = el;
            }}
            className="py-[53px]"
          >
            <div className="border-l-[8px] pl-[23px] mb-[23px] border-linkColor">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                Описание
              </h2>
            </div>
            <div className="prose max-w-none pl-[31px]">{editorContent}</div>
          </section>
        )}

        {product.characteristics && product.characteristics.length > 0 && (
          <section
            id="specs"
            ref={(el) => {
              if (el) sectionRefs.current.specs = el;
            }}
            className="py-[53px]"
          >
            <div className="border-l-[8px] pl-[23px] mb-[23px] border-linkColor">
              <h2 className="text-xl font-semibold mb-6">Характеристики</h2>
            </div>
            <div>
              {product.characteristics.map((group, index) => (
                <div key={index} className="overflow-auto bg-white">
                  <table className="w-full text-left border">
                    <thead>
                      <tr className="bg-superSilver border-b-2 border-cerulean">
                        <th
                          colSpan={2}
                          className="py-[6px] font-semibold text-sm text-textColor text-center"
                        >
                          {group.title}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.options.map((option, optIndex) => (
                        <tr key={optIndex} className="border-b">
                          <td className="p-2 w-1/2 font-normal text-sm text-textColor leading-[21px]">
                            {option.name}
                          </td>
                          <td className="p-2 w-1/2 font-normal text-sm text-textColor leading-[21px] border-l">
                            {option.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>
        )}

        <section
          id="reviews"
          ref={(el: HTMLElement | null): void => {
            sectionRefs.current.reviews = el;
          }}
          className="py-[53px] bg-whiteOut"
          style={{ scrollMarginTop: "100px" }}
        >
          <div className="border-l-[8px] pl-[23px] mb-[23px] border-linkColor">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              Отзывы о товаре
            </h2>
          </div>
          <div className="max-w-none pl-[31px]">
            <p className="text-base font-normal text-textColor mb-6">
              Пока нет ни одного отзыва
            </p>
            <div className="flex gap-5 items-center">
              <button className="bg-cerulean hover:opacity-90 transition-opacity px-6 py-[10px] text-base font-semibold text-white inline-flex items-center justify-center gap-2">
                <CirclePlus className="text-white w-5 h-5" />
                <span>Добавить отзыв</span>
              </button>
              <div className="flex gap-2 items-center">
                <StarIcon className="text-white w-[25px] h-[22px]" />
                <span className="text-[26px] font-normal text-textColor leading-[39px]">
                  0
                </span>
              </div>
            </div>
          </div>
        </section>
        <section
          id="questions"
          ref={(el: HTMLElement | null): void => {
            sectionRefs.current.questions = el;
          }}
          className="py-[53px] mb-10"
          style={{ scrollMarginTop: "100px" }}
        >
          <div className="border-l-[8px] pl-[23px] mb-[23px] border-linkColor">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              Вопросы о товаре
            </h2>
          </div>
          <div className="max-w-none pl-[31px]">
            <p className="text-base font-normal text-textColor mb-6">
              Пока нет ни одного вопроса.
            </p>
            <button className="bg-cerulean hover:opacity-90 transition-opacity px-6 py-[10px] text-base font-semibold text-white inline-flex items-center justify-center gap-2">
              <CirclePlus className="text-white w-5 h-5" />
              <span>Задать вопрос</span>
            </button>
          </div>
        </section>
        <div className="">
          <div className="flex items-center gap-4 border rounded-[10px] border-cerulean p-3.5">
            <CircleAlert className="w-5 h-5 text-cerulean" />
            <div className="flex flex-col gap-5 flex-1">
              <p className="text-cerulean text-xs font-normal">
                Уважаемые покупатели. <br />
                Обращаем Ваше внимание, что размещенная на данном сайте
                справочная информация о товарах не является офертой, наличие и
                стоимость оборудования необходимо уточнить у менеджеров  "НАГ
                Узбекистан", которые с удовольствием помогут Вам в выборе
                оборудования и оформлении на него заказа.
              </p>
              <p className="text-cerulean text-xs font-normal">
                Производитель оставляет за собой право изменять внешний вид,
                технические характеристики и комплектацию без уведомления.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
