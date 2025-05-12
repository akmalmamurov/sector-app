import { IssuesData } from "@/types/issues";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { X } from "lucide-react";
import { format } from "date-fns";
import { formatDate } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { showError, showSuccess } from "../toast/Toast";
import request from "@/services";
import { UPDATE_ISSUES } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useConfirmModal } from "@/hooks";
import ConfirmModal from "./ConfirmModal";

interface Props {
  open: boolean;
  toggleModal: () => void;
  issues: Partial<IssuesData>;
}

export const IssueModal = ({ open, toggleModal, issues }: Props) => {
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();
  useEffect(() => {
    if (open) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    if (data.file && data.file.length > 0) {
      formData.append("imageRequest", data.file[0]);
    }
    formData.append("message", data.description);
    try {
      await request.patch(`${UPDATE_ISSUES}/${issues?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      toggleModal();
      showSuccess("Заявка отправлена");
    } catch (error) {
      showError("Что то пошло не так");
      console.log(error);
    }
  };

  const handleDeleteClick = () => {
    openModal("Вы уверены, что хотите закрыть заявку?", async () => {
      try {
        await request.delete(`${UPDATE_ISSUES}/${issues?.id}`);
        queryClient.invalidateQueries({ queryKey: ["issues"] });
        showSuccess("Заявка удалена");
        toggleModal();
      } catch (error) {
        showError("Что-то пошло не так");
        console.error(error);
      }
    });
  };

  const handleFileSelect = () => fileInputRef.current?.click();
  const handleFileChange = () => {
    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      setFileName(files[0].name);
      setValue("file", files);
    }
  };

  return (
    <Dialog open={open} onOpenChange={toggleModal}>
      <DialogContent className="max-w-[900px] sm:rounded-none p-0 border-none h-[740px] overflow-y-scroll scrollbar-hide ">
        <DialogHeader className="px-[23px] pt-[23px] pb-1">
          <div className=" flex  justify-between items-center">
            <div>
              <div className="flex gap-2 items-center">
                <div className="h-8">
                  <div className="w-3 h-3 bg-greenLight rounded-full"></div>
                </div>
                <DialogTitle className="text-textColor font-normal text-base flex flex-col">
                  <span>
                    Заявка #{issues?.requestNumber}
                    <span className="ml-1">{issues?.topic}</span>
                  </span>
                  <span className="text-sm mt-1 text-darkSoul">
                    Последний ответ:{" "}
                    {issues?.messages?.length
                      ? format(
                          new Date(
                            issues.messages[
                              issues.messages.length - 1
                            ].createdAt
                          ),
                          "dd.MM.yyyy HH:mm"
                        )
                      : "-"}
                  </span>
                </DialogTitle>
              </div>
            </div>
            <button onClick={toggleModal}>
              <X className={"w-6 h-6  text-textColor"} />
            </button>
          </div>
        </DialogHeader>
        <DialogDescription className="hidden">asd</DialogDescription>
        <Separator className=" h-[0.5px]" />
        <div className="px-[23px] pt-1 pb-[23px]">
          {issues?.messages?.map((el, index) => (
            <div
              key={index}
              className="border border-superSilver p-[15px] bg-background text-textColor rounded-sm mb-5"
            >
              <p>{issues?.user?.name}</p>
              <span className="text-xs mt-1">
                {formatDate(el.createdAt)} {el.message},
                <span className="ml-1">от {issues?.user?.email}</span>
              </span>
              <p className="mt-3">{el.message}</p>
            </div>
          ))}
          <div className="border border-superSilver p-6">
            <div className="relative flex justify-center pb-[19px]">
              <div className=" relative before:content-[''] before:absolute before:left-1/2 before:bottom-[-19px]  before:-translate-x-1/2 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-cerulean before:to-linkColor before:opacity-100 text-lg text-lightBlack">
                Ответить
              </div>
            </div>
            <hr className="border-superSilver mb-[23px]" />
            <form onSubmit={handleSubmit(onSubmit)} className="mt-[30px]">
              <div>
                <Label
                  htmlFor="description"
                  className="text-textColor text-sm "
                >
                  Описание
                  <span className="text-cerulean ml-1">*</span>
                </Label>
                <Textarea
                  {...register("description", { required: true })}
                  id="description"
                  className="h-[93px] mt-1 resize-none rounded-none border border-superSilver focus-visible:ring-cerulean hover:border-cerulean/80 focus-visible:hover:border-transparent"
                />
              </div>
              {/* Прикрепить файл */}
              <div className="my-6 flex justify-end">
                <div className="w-[391px]">
                  <Label htmlFor="fileInput" className="text-textColor text-sm">
                    Прикрепите файл
                  </Label>
                  <input
                    type="file"
                    id="fileInput"
                    accept=".png,.jpg,.jpeg"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <div className="flex items-center mt-1">
                    <Input
                      type="text"
                      readOnly
                      value={fileName}
                      placeholder="Файл не выбран"
                      className="h-[41px] rounded-none border border-superSilver focus-visible:ring-cerulean"
                    />
                    <Button
                      type="button"
                      onClick={handleFileSelect}
                      className="bg-greenLight hover:bg-greenLight w-[122px] rounded-[8px] h-[42px] font-semibold text-white"
                    >
                      Обзор
                    </Button>
                  </div>
                  <p className="text-xs mt-1">
                    Допустимые форматы: PNG, JPG, JPEG
                  </p>
                </div>
                {errors.file && (
                  <p className="text-red-600 text-sm">
                    {errors.file.message as string}
                  </p>
                )}
              </div>
              <hr className="border-superSilver mb-5 mt-10" />
              <div className="flex justify-center gap-5">
                <button
                  disabled={!isValid}
                  type="submit"
                  className="flex w-[200px] disabled:bg-superSilver disabled:text-darkSoul font-semibold h-[42px] bg-cerulean text-white  justify-center items-center "
                >
                  Ответить
                </button>
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="flex w-[200px] h-[42px] bg-dangerColor text-white  justify-center items-center gap-1 font-semibold"
                >
                  <X className="text-white" />
                  Закрыть заявку
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </Dialog>
  );
};

export default IssueModal;
