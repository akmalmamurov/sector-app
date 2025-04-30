"use client";
import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DOMAIN } from "@/constants";
import { CommentProduct, ProductData } from "@/types";
import { CircleAlert, CirclePlus, Star, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { StarRating } from "../star-rating/StarRating";
import { useCreateComment } from "@/api/product-comment";
import { usePostQuestion } from "@/api/product-question";
import { useScrollDirection } from "@/hooks";
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
interface AdditionalProductProp {
  body: string;
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
          <div className="flex gap-8 my-4">
            <div key={block.id} className="w-20">
              <div className="relative w-12 h-12">
                <Image src={imageUrl} alt={caption} fill className="object-cover rounded" />
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

export function ProductDescription({ product }: ProductDescriptionProps) {
  const scrollDir = useScrollDirection();
  const [activeTab, setActiveTab] = useState("description");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<CommentProduct | null>(null);

  const formSchema = z.object({
    body: z.string().min(3, "Текст должен содержать не менее 3 символов"),
  });

  const formMethods = useForm<AdditionalProductProp>({
    resolver: zodResolver(formSchema),
    defaultValues: { body: "" },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;
  const { mutate: createComment } = useCreateComment();
  const { mutate: postQuestion } = usePostQuestion();
  const handleOpen = () => setIsOpen(!isOpen);
  const handleOpen2 = () => setIsOpen2(!isOpen2);
  const isScroll = scrollDir === "up" ? true : false;
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
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.3,
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
  const onSubmit = async (data: AdditionalProductProp) => {
    createComment(
      {
        body: data.body,
        productId: product.id,
        star: rating,
      },
      {
        onSuccess: (responseData) => {
          handleOpen();
          reset();
          setRating(0);
          setComments(responseData);
        },
      }
    );
  };
  const onSubmit2 = async (data: AdditionalProductProp) => {
    postQuestion(
      {
        body: data.body,
        productId: product.id,
      },
      {
        onSuccess: () => {
          handleOpen2();
          reset();
        },
      }
    );
  };

  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const activeButton = buttonRefs.current[activeTab];
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  return (
    <>
      <div>
        <div
          className={`hidden sm:block sticky ${isScroll ? "top-[78px] lg:top-[130px]" : "top-0"} bg-white border-b shadow-sectionShadow overflow-x-auto whitespace-nowrap scrollbar-hide`}
        >
          {sections.map(({ id, label }) => (
            <button
              key={id}
              ref={(el) => {
                buttonRefs.current[id] = el;
              }}
              className={`px-5 py-3.5 text-center border-b-2 transition-all relative inline-block ${
                activeTab === id
                  ? "text-cerulean title_gradient"
                  : "border-transparent"
              }`}
              onClick={() => handleTabClick(id)}
            >
              {label}
            </button>
          ))}
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
              <div className="pl-[31px]">
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
            id="related"
            ref={(el: HTMLElement | null): void => {
              sectionRefs.current.related = el;
            }}
            className="py-[53px] bg-whiteOut"
            style={{ scrollMarginTop: "100px" }}
          >
            <div className="border-l-[8px] pl-[23px] mb-[23px] border-linkColor">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                Сопутствующие товары
              </h2>
            </div>
            <div className="max-w-none pl-[31px]">
              <p className="text-base font-normal text-textColor mb-6">
                API hali tayyor emas
              </p>
            </div>
          </section>
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
                <button
                  onClick={handleOpen}
                  className="bg-cerulean hover:opacity-90 transition-opacity px-6 py-[10px] text-base font-semibold text-white inline-flex items-center justify-center gap-2"
                >
                  <CirclePlus className="text-white w-5 h-5" />
                  <span>Добавить отзыв</span>
                </button>
                <div className="flex gap-2 items-center">
                  {comments?.star && comments?.star > 0 ? (
                    <Star
                      className={`w-[25px] h-[22px]} text-[#FBCE13] fill-[#FBCE13]`}
                    />
                  ) : (
                    <Star
                      className={`w-[25px] h-[22px]} text-[#A3A3A3] fill-[#A3A3A3]`}
                    />
                  )}
                  <span className="text-[26px] font-normal text-textColor leading-[39px]">
                    {comments?.star ? comments?.star : 0}
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
            className="pt-[53px] pb-[30px] mb-10"
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
              <button
                onClick={handleOpen2}
                className="bg-cerulean hover:opacity-90 transition-opacity px-6 py-[10px] text-base font-semibold text-white inline-flex items-center justify-center gap-2"
              >
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
                  стоимость оборудования необходимо уточнить у менеджеров  "НАГ
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
      <Dialog open={isOpen} onOpenChange={handleOpen}>
        <DialogContent className="sm:max-w-[800px] rounded-none sm:rounded-none p-0">
          <DialogHeader className="px-6 pr-8">
            <DialogTitle className=" pt-5 pb-0 text-textColor text-2xl font-normal">
              {product.title}
            </DialogTitle>
            <button onClick={handleOpen} className="absolute right-4 top-4">
              <X className="w-6 h-6 text-wasabiColor" />
            </button>
          </DialogHeader>
          <DialogDescription className="hidden">asdsad</DialogDescription>
          <div className="px-6">
            <Form {...formMethods}>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="pb-5 flex flex-col gap-2"
              >
                <p className="text-xl font-normal text-textColor mb-5">
                  Нет отзывов
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xl font-normal text-textColor">
                    Общая оценка:
                  </p>
                  <StarRating
                    value={rating}
                    onChange={(val) => setRating(val)}
                  />
                </div>
                <FormField
                  control={control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full flex flex-col gap-2">
                          <Label
                            htmlFor="body"
                            className="text-textColor font-normal text-xl"
                          >
                            Напишите, почему вы так считаете *
                          </Label>
                          <Textarea
                            {...field}
                            id="body"
                            className="!text-xl resize-none outline-none rounded-[10px] h-[222px] text-textColor border-[#ccc]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-normal text-xl text-red-500">
                        {errors.body?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className={`mt-6 ml-auto h-12 bg-cerulean text-white py-2 px-16 font-semibold text-sm leading-[18px] rounded-[9px] hover:bg-cerulean/90 hoverEffect
              `}
                >
                  Сохранить
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isOpen2} onOpenChange={handleOpen2}>
        <DialogContent className="sm:max-w-[800px] rounded-none sm:rounded-none p-0">
          <DialogHeader>
            <DialogTitle className="px-6 py-5 text-textColor text-2xl font-normal">
              Задать вопрос
            </DialogTitle>
            <button onClick={handleOpen2} className="absolute right-4 top-4">
              <X className="w-6 h-6 text-wasabiColor" />
            </button>
          </DialogHeader>
          <DialogDescription className="hidden">asdsad</DialogDescription>
          <div className="px-6">
            <Form {...formMethods}>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit2)}
                className="pb-5 flex flex-col gap-4"
              >
                <FormField
                  control={control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full flex flex-col gap-2">
                          <Label
                            htmlFor="text"
                            className="text-textColor font-normal text-xl"
                          >
                            Задайте вопрос по товару. После проверки вопрос
                            будет опубликован *
                          </Label>
                          <Textarea
                            {...field}
                            id="text"
                            className="!text-xl resize-none outline-none rounded-[10px] h-[222px] text-textColor border-[#ccc]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-normal text-xl text-red-500">
                        {errors.body?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className={`mt-6 ml-auto h-12 bg-cerulean text-white py-2 px-16 font-semibold text-sm leading-[18px] rounded-[9px] hover:bg-cerulean/90 hoverEffect
                `}
                >
                  Отправлять
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
