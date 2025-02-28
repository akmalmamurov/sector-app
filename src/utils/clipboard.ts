import { showError, showSuccess } from "@/components/toast/Toast";

export const copyToClipboard = (text: string, successMessage?: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
     showSuccess(successMessage || "Текст скопирован в буфер обмена");
    })
    .catch(() => {
      showError("Ошибка при копировании в буфер обмена");
    });
};
