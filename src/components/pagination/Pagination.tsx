import React from "react";

interface PaginationProps {
  total: number;         // Umumiy mahsulotlar soni
  page: number;          // Hozirgi sahifa
  limit: number;         // Bir sahifadagi mahsulotlar soni
  setPage: (page: number) => void; // Sahifani o'zgartiruvchi funksiya
}

// Sahifalar ro'yxatini generatsiya qiladigan yordamchi funksiya
function createPagination(totalPages: number, currentPage: number): (number | string)[] {
  const pages: (number | string)[] = [];

  // Agar umumiy sahifalar soni 7 yoki undan kam bo'lsa, hammasini to'g'ridan-to'g'ri ko'rsatamiz
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // 1) Agar hozirgi sahifa boshida bo'lsa
  if (currentPage <= 4) {
    // 1 dan 5 gacha bo'lgan sahifalarni ko'rsatamiz
    for (let i = 1; i <= 5; i++) {
      pages.push(i);
    }
    // Keyin "..." va oxirgi sahifani ko'rsatamiz
    pages.push("...");
    pages.push(totalPages);
    return pages;
  }

  // 2) Agar hozirgi sahifa oxiriga yaqin bo'lsa
  if (currentPage > totalPages - 4) {
    // Boshida 1 va "..."
    pages.push(1);
    pages.push("...");
    // Keyin oxirgi 5 sahifani ko'rsatamiz
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // 3) Aks holda, o'rtada turgan sahifa
  pages.push(1);
  pages.push("...");
  // Hozirgi sahifa atrofida 3 ta (currentPage - 1, currentPage, currentPage + 1) sahifani ko'rsatamiz
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    pages.push(i);
  }
  pages.push("...");
  pages.push(totalPages);
  return pages;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  setPage,
  page,
  limit,
}) => {
  // Umumiy sahifalar soni
  const totalPages = Math.ceil(total / limit);

  // Tugmalar bosilganda scroll ni yuqoriga ko'tarish
  const onPageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Sahifalar massivini oldik
  const pages = createPagination(totalPages, page);

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Oldingi sahifaga o'tish tugmasi */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Назад
      </button>

      {/* Sahifalar ro'yxati */}
      {pages.map((p, index) => {
        // Agar p '...' bo'lsa, nuqta chiqaramiz
        if (p === "...") {
          return (
            <span key={index} className="px-2 py-1">
              ...
            </span>
          );
        }

        // Aks holda p raqam (number) bo'ladi
        const pageNumber = p as number;
        return (
          <button
            key={index}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 border rounded transition-colors 
              ${pageNumber === page ? "bg-purple-500 text-white" : "bg-white"}`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Keyingi sahifaga o'tish tugmasi */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Дальше
      </button>
    </div>
  );
};

export default Pagination;
