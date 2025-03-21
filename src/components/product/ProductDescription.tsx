"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { DOMAIN } from "@/constants"; 
import { ProductData } from "@/types";
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
            dangerouslySetInnerHTML={{ __html: block.data.text || '' }}
          />
        );
      case "header":
        const level = block.data.level || 2;
        const HeaderTag = `h${level}` as `h1` | `h2` | `h3` | `h4` | `h5` | `h6`;
        return React.createElement(HeaderTag, { key: block.id }, block.data.text || '');
      case "list":
        const isOrdered = block.data.style === "ordered";
        const ListTag = isOrdered ? "ol" : "ul";
        return (
          <ListTag key={block.id}>
            {block.data.items?.map((item: { content: string }, idx: number) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: item.content }} />
            ))}
          </ListTag>
        );
      case "image":
        {
          let imageUrl = fullImages[imageIndex] || "";
          imageIndex++;
          if (DOMAIN && !imageUrl.startsWith("http")) {
            imageUrl = DOMAIN + (imageUrl.startsWith("/") ? "" : "/") + imageUrl;
          }
          const caption = block.data.caption || "";
          return (
            <div key={block.id} className="relative w-full h-64 my-4">
              <Image
                src={imageUrl}
                alt={caption}
                fill
                style={{ objectFit: "contain" }}
              />
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
  if (typeof product.fullDescriptionImages === 'string') {
    try {
      fullImages = JSON.parse(product.fullDescriptionImages || '[]');
    } catch (error) {
      console.error('Error parsing fullDescriptionImages:', error);
    }
  } else if (Array.isArray(product.fullDescriptionImages)) {
    fullImages = product.fullDescriptionImages;
  }

  let editorContent: React.ReactNode = null;
  try {
    const descObj = JSON.parse(typeof product.fullDescription === 'string' ? product.fullDescription : "{}");
    editorContent = renderEditorBlocks(descObj, fullImages);
  } catch (error) {
    console.log("Parsing fullDescription error:", error);
    editorContent = product.fullDescription;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
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

  return (
    <div>
      <div className="sticky top-[8.12rem] z-[5] bg-white shadow-md flex border-b">
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
              onClick={() =>
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="p-[23px] space-y-20 bg-white">
        {editorContent && (
          <section
            id="description"
            ref={(el: HTMLElement | null): void => {
              sectionRefs.current.description = el;
            }}
            className="pt-8"
            style={{ scrollMarginTop: "180px" }}
          >
            <div className="border-l-[8px] pl-[23px] mb-[23px] border-cerulean">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                Описание
              </h2>
            </div>
            <div className="prose max-w-none">{editorContent}</div>
          </section>
        )}

        {product.characteristics && product.characteristics.length > 0 && (
          <section
            id="specs"
            ref={(el: HTMLElement | null): void => {
              sectionRefs.current.specs = el;
            }}
            className="pt-8"
            style={{ scrollMarginTop: "180px" }}
          >
            <div className="border-l-[8px] pl-[23px] mb-[23px] border-cerulean">
              <h2 className="text-2xl font-bold mb-6">Характеристики</h2>
            </div>
            <div>
              {product.characteristics.map((group, index) => (
                <div key={index} className="overflow-auto bg-white shadow mb-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th
                          colSpan={2}
                          className="py-4 font-semibold text-lg text-gray-700 text-center"
                        >
                          {group.title}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.options.map((option, optIndex) => (
                        <tr key={optIndex} className="border-b">
                          <td className="p-4 w-1/2 font-medium text-gray-600">
                            {option.name}
                          </td>
                          <td className="p-4 w-1/2 text-gray-900">
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

        {["related", "reviews", "questions"].map((id) => {
          const label = sections.find((section) => section.id === id)?.label || "";
          return (
            <section
              key={id}
              id={id}
              ref={(el: HTMLElement | null): void => {
                sectionRefs.current[id] = el;
              }}
              className="pt-8"
              style={{ scrollMarginTop: "180px" }}
            >
              <h2 className="text-2xl font-bold mb-4">{label}</h2>
              <p>Контент для раздела {label}...</p>
            </section>
          );
        })}
      </div>
    </div>
  );
}
