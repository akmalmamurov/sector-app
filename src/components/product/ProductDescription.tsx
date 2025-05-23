"use client";
import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DOMAIN } from "@/constants";
import { CommentResponse, ProductData, QuestionResponse } from "@/types";
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
import { getProductComments, useCreateComment } from "@/api/product-comment";
import { getProductQuestions, usePostQuestion } from "@/api/product-question";
import { useScrollDirection } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SortAmountDownIcon from "@/assets/icons/SortAmountDownIcon";
import SortAmountUpIcon from "@/assets/icons/SortAmountUpIcon";
import QuestionCheckIcon from "@/assets/icons/QuestionCheckIcon";
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
  // { id: "related", label: "Сопутствующие товары" },
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

export function ProductDescription({ product }: ProductDescriptionProps) {
  const scrollDir = useScrollDirection();
  const [activeTab, setActiveTab] = useState("description");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [rating, setRating] = useState(0);

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
        onSuccess: () => {
          handleOpen();
          reset();
          setRating(0);
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

  const { data: commentsData } = useQuery({
    queryKey: ["comments", product.id],
    queryFn: () => getProductComments(product.id),
  });

  const { data: questionsData } = useQuery({
    queryKey: ["questions", product.id],
    queryFn: () => getProductQuestions(product.id),
  });

  const handleSort = (value: string) => {
    console.log(value);
  };
  const handleSort2 = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <div>
        <div
          className={`hidden sm:block sticky ${isScroll ? "top-[78px] lg:top-[130px]" : "top-0"} bg-white border-b shadow-sectionShadow overflow-x-auto whitespace-nowrap scrollbar-hide`}
        >
          {sections.map(({ id, label }, index) => (
            <button
              key={index}
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

        <div className="bg-whiteOut shadow-sectionShadow py-[23px]">
          {editorContent && (
            <section
              id="description"
              ref={(el) => {
                if (el) sectionRefs.current.description = el;
              }}
              className="py-[53px] px-[23px]"
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
              className="py-[53px] px-[23px]"
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
            className="py-[53px] bg-white px-[23px] hidden"
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
            className="py-[53px] bg-whiteOut px-[23px]"
            style={{ scrollMarginTop: "100px" }}
          >
            <div className="border-l-[8px] pl-[23px] mb-[23px] border-linkColor">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                Отзывы о товаре
              </h2>
            </div>
            <div className="max-w-none pl-[31px]">
              <p
                className={`${commentsData?.data?.comments.length > 0 ? "hidden" : "block"} info-text mb-6`}
              >
                Пока нет ни одного отзыва
              </p>
              <div className="flex items-center justify-between mb-12">
                <div className="flex gap-5 items-center">
                  <button
                    onClick={handleOpen}
                    className="bg-cerulean hover:opacity-90 transition-opacity px-6 py-[10px] text-base font-semibold text-white inline-flex items-center justify-center gap-2"
                  >
                    <CirclePlus className="text-white w-5 h-5" />
                    <span>Добавить отзыв</span>
                  </button>
                  <div className="flex gap-2 items-center">
                    {commentsData?.data?.mediaStar &&
                    commentsData?.data?.mediaStar > 0 ? (
                      <Star
                        className={`w-[25px] h-[22px]} text-[#FBCE13] fill-[#FBCE13]`}
                      />
                    ) : (
                      <Star
                        className={`w-[25px] h-[22px]} text-[#A3A3A3] fill-[#A3A3A3]`}
                      />
                    )}
                    <span className="text-[26px] font-normal text-textColor leading-[39px]">
                      {commentsData?.data?.mediaStar
                        ? commentsData?.data?.mediaStar.toFixed(1)
                        : 0}
                    </span>
                  </div>
                </div>
                <div
                  className={`${commentsData?.data?.length > 0 ? "block" : "hidden"}`}
                >
                  <Select defaultValue="ratingDown" onValueChange={handleSort}>
                    <SelectTrigger className="px-4 h-[42px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ratingDown">
                        <div className="flex items-center gap-2">
                          <SortAmountDownIcon className="w-[16.5px] h-[16.5px] text-textColor" />
                          <span className="font-normal text-base text-textColor">
                            По оценке
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ratingUp">
                        <div className="flex items-center gap-2">
                          <SortAmountUpIcon className="w-[16.5px] h-[16.5px] text-textColor" />
                          <span className="font-normal text-base text-textColor">
                            По оценке
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dateDown">
                        <div className="flex items-center gap-2">
                          <SortAmountDownIcon className="w-[16.5px] h-[16.5px] text-textColor" />
                          <span className="font-normal text-base text-textColor">
                            По дате
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dateUp">
                        <div className="flex items-center gap-2">
                          <SortAmountUpIcon className="w-[16.5px] h-[16.5px] text-textColor" />
                          <span className="font-normal text-base text-textColor">
                            По дате
                          </span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {commentsData?.data?.comments.length > 0 &&
                commentsData?.data?.comments.map(
                  (
                    comment: CommentResponse,
                    index: number,
                    array: CommentResponse[]
                  ) => (
                    <div
                      className={`${index === array.length - 1 ? "pb-0 mb-0 border-transparent" : "border-b border-noghreiSilver mb-10 pb-5"}`}
                      key={comment.id}
                    >
                      <div className="flex items-center gap-2 justify-between mb-4 px-4">
                        <h4 className="info-semibold">{comment.user.name}</h4>
                        <span className="info-semibold">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "uz-UZ",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4 px-4">
                        {Array.from({ length: comment.star }, (_, index) => (
                          <Star
                            key={index}
                            className={`w-[25px] h-[22px]} text-[#FBCE13] fill-[#FBCE13]`}
                          />
                        ))}
                      </div>
                      <p className="info-text mb-4 px-4">{comment.body}</p>
                      <div className="bg-whiteOut p-4 flex flex-col gap-10">
                        {comment.reply.length > 0 &&
                          comment.reply.map((item) => (
                            <div key={item.id}>
                              <div className="flex gap-6">
                                <div className="w-[58px] h-[58px] border-[1px] border-transparent border-l-darkSoul  border-b-darkSoul"></div>
                                <div className="flex-1">
                                  <div className=" flex items-center gap-2 justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                      <h4 className="info-semibold">
                                        Sector Technology
                                      </h4>
                                      <QuestionCheckIcon className="w-[25px] h-[25px] text-cerulean" />
                                    </div>
                                    <p className="info-semibold">
                                      {new Date(
                                        item.createdAt
                                      ).toLocaleDateString("uz-UZ", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      })}
                                    </p>
                                  </div>
                                  <p className="info-text">{item.message}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
                )}
            </div>
          </section>
          <section
            id="questions"
            ref={(el: HTMLElement | null): void => {
              sectionRefs.current.questions = el;
            }}
            className="pt-[53px] pb-[30px] mb-10 px-[23px] bg-white"
            style={{ scrollMarginTop: "100px" }}
          >
            <div className="border-l-[8px] pl-[23px] mb-[23px] border-linkColor">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                Вопросы о товаре
              </h2>
            </div>
            <div className="max-w-none pl-[31px]">
              <p
                className={`${questionsData?.data?.length > 0 ? "hidden" : "block"} info-text mb-6`}
              >
                Пока нет ни одного вопроса.
              </p>
              <div className="flex items-center justify-between mb-12">
                <button
                  onClick={handleOpen2}
                  className="bg-cerulean hover:opacity-90 transition-opacity px-6 py-[10px] text-base font-semibold text-white inline-flex items-center justify-center gap-2"
                >
                  <CirclePlus className="text-white w-5 h-5" />
                  <span>Задать вопрос</span>
                </button>
                <div
                  className={`${questionsData?.length > 0 ? "block" : "hidden"}`}
                >
                  <Select defaultValue="dateDown2" onValueChange={handleSort2}>
                    <SelectTrigger className="px-4 h-[42px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ratingDown2">
                        <div className="flex items-center gap-2">
                          <SortAmountDownIcon className="w-[16.5px] h-[16.5px] text-textColor" />
                          <span className="font-normal text-base text-textColor">
                            По оценке
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ratingUp2">
                        <div className="flex items-center gap-2">
                          <SortAmountUpIcon className="w-[16.5px] h-[16.5px] text-textColor" />
                          <span className="font-normal text-base text-textColor">
                            По оценке
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dateDown2">
                        <div className="flex items-center gap-2">
                          <SortAmountDownIcon className="w-[16.5px] h-[16.5px] text-textColor" />
                          <span className="font-normal text-base text-textColor">
                            По дате
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dateUp2">
                        <div className="flex items-center gap-2">
                          <SortAmountUpIcon className="w-[16.5px] h-[16.5px] text-textColor" />
                          <span className="font-normal text-base text-textColor">
                            По дате
                          </span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {questionsData?.data?.length > 0 &&
                questionsData?.data?.map((question: QuestionResponse) => (
                  <div key={question.id}>
                    <div className="flex items-center gap-2 justify-between mb-4 px-4">
                      <h4 className="info-semibold">{question.user.name}</h4>
                      <span className="info-semibold">
                        {new Date(question.createdAt).toLocaleDateString(
                          "uz-UZ",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }
                        )}
                      </span>
                    </div>
                    <p className="info-text mb-4 px-4">{question.body}</p>
                    <div className="bg-whiteOut p-4 flex flex-col gap-10">
                      {question.reply.length > 0 &&
                        question.reply.map((item) => (
                          <div key={item.id} className="flex gap-6">
                            <div className="w-[58px] h-[58px] border-[1px] border-transparent border-l-darkSoul  border-b-darkSoul"></div>
                            <div className="flex-1">
                              <div className=" flex items-center gap-2 justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <h4 className="info-semibold">
                                    Sector Technology
                                  </h4>
                                  <QuestionCheckIcon className="w-[25px] h-[25px] text-cerulean" />
                                </div>
                                <p className="info-semibold">
                                  {new Date(item.createdAt).toLocaleDateString(
                                    "uz-UZ",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
                              </div>
                              <p className="info-text">{item.message}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>
          <div className="px-[23px]">
            <div className="flex items-center gap-4 border rounded-[10px] border-cerulean p-3.5">
              <CircleAlert className="w-5 h-5 text-cerulean" />
              <div className="flex flex-col gap-5 flex-1">
                <p className="text-cerulean text-xs font-normal">
                  Уважаемые покупатели. <br />
                  Обращаем Ваше внимание, что размещенная на данном сайте
                  справочная информация о товарах не является офертой, наличие и
                  стоимость оборудования необходимо уточнить у менеджеров "НАГ
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
