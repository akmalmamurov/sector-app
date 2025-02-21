import toast, { Toast } from "react-hot-toast";

type ToastType = "success" | "warning" | "info" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
}

const toastStyles: Record<ToastType, { bg: string; text: string }> = {
  success: { bg: "#6AB04C", text: "#FFFFFF" },
  warning: { bg: "#FFE8C3", text: "#FFFFFF" },
  info: { bg: "#CCE3FF", text: "#FFFFFF" },
  error: { bg: "#FF3333", text: "#FFFFFF" },
};

const showToast = ({ message, type }: ToastProps) => {
  toast.custom((t: Toast) => {
    const { bg, text } = toastStyles[type];

    return (
      <div
        className="toastStyle max-w-[500px] w-full py-[15px] pl-[30px] pr-[23px] shadow-toastShadow"
        style={{ backgroundColor: bg }}
      >
        <div className="h-full w-full flex items-center gap-2 sm:gap-4 justify-between">
          <p className="font-normal text-sm " style={{ color: text }}>
            {message}
          </p>
          <button
            className="cursor-pointer text-white"
            onClick={() => toast.remove(t.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  });
};

export const showSuccess = (message: string) =>
  showToast({ message, type: "success" });
export const showWarning = (message: string) =>
  showToast({ message, type: "warning" });
export const showInfo = (message: string) =>
  showToast({ message, type: "info" });
export const showError = (message: string) =>
  showToast({ message, type: "error" });
