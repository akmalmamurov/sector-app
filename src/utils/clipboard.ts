import toast from "react-hot-toast";

export const copyToClipboard = (text: string, successMessage?: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success(successMessage || "Текст скопирован в буфер обмена");
    })
    .catch(() => {
      toast.error("Ошибка при копировании в буфер обмена");
    });
};
