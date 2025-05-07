"use client";
import { DeleteIcon, SidebarSharesIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { useConfirmModal } from "@/hooks";
import { ConfirmModal } from "../modal";
import { copyToClipboard } from "@/utils";

export const CompareClear = () => {
  const { resetCompares, compares } = useStore();
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();
  const handleDeleteAll = () => {
    openModal("Вы уверены, что хотите очистить список сравнения? ", () => {
      resetCompares();
    });
  };
  return (
    <div>
      {compares?.length > 0 && (
        <div>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteAll}
              className="flex items-center group px-6 py-[8px] border border-superSilver hover:border-cerulean hoverEffect
            gap-4 text-weekColor font-semibold leading-6"
            >
              <span>
                <DeleteIcon className="w-[18px] h-[18px] group-hover:text-cerulean duration-200 ease-in-out" />
              </span>
              <span className="group-hover:text-cerulean duration-200 ease-in-out hidden sm:block">
                Очистить список
              </span>
            </button>
            <button
              onClick={() =>
                copyToClipboard(
                  window.location.href,
                  `Скопирован в буфер обмена`
                )
              }
              className="w-12 h-[42px] flex items-center justify-center border border-superSilver hover:border-cerulean hoverEffect text-weekColor hover:text-cerulean"
            >
              <SidebarSharesIcon />
            </button>
          </div>
          <ConfirmModal
            isOpen={isConfirmOpen}
            onConfirm={onConfirm}
            message={message}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default CompareClear;
