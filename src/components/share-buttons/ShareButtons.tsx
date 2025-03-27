"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Copy, Share2 } from "lucide-react";
import Link from "next/link";
import WhatsUpIcon from "@/assets/icons/WhatsUpIcon";
import TelegramShareIcon from "@/assets/icons/TelegramShareIcon";
import { showError, showSuccess } from "../toast/Toast";

interface ShareDropdownProps {
  url: string;
}

const ShareButtons = ({ url }: ShareDropdownProps) => {
  const encodedURL = encodeURIComponent(url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showSuccess("Ссылка скопирована в буфер обмена");
    } catch {
      showError("Не удалось скопировать ссылку");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Share2 className="text-darkSoul w-6 h-6 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full">
        <DropdownMenuItem>
          <Link
            href={`https://wa.me/?text=${encodedURL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center py-0.5 gap-2 h-auto w-full text-sm text-textColor"
          >
            <WhatsUpIcon className="w-6 h-6" />
            WhatsApp
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            href={`https://t.me/share/url?url=${encodedURL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center py-0.5 gap-2 w-full h-auto text-sm text-textColor"
          >
            <TelegramShareIcon className="w-6 h-6" />
            Telegram
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleCopy}
        > 
        <div className="flex items-center py-0.5 gap-2 w-full h-auto text-sm text-textColor">
          <Copy className="w-6 h-6 text-[rgb(51, 51, 51)]" />
          Скопировать ссылку
        </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButtons;
