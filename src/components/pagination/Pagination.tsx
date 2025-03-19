import { ArrowRightIcon } from "@/assets/icons";
import { createPagination } from "@/utils";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}




export const Pagination: React.FC<PaginationProps> = ({
  total,
  setPage,
  page,
  limit,
}) => {
  const totalPages = Math.ceil(total / limit);

  const onPageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 50, behavior: "smooth" });
    }
  };

  const pages = createPagination(totalPages, page);

  return (
    <div className="flex justify-center gap-2 px-2 py-[15px]">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-[23px]  border border-cerulean text-cerulean disabled:opacity-50 flex items-center hover:bg-cerulean hover:text-white duration-200 ease-in-out disabled:hover:bg-transparent disabled:hover:text-cerulean text-sm"
      >
        <span className="mr-2">
          <ArrowRightIcon className="rotate-180" />
        </span>
        Назад
      </button>

      {pages.map((p, index) => {
        if (p === "...") {
          return (
            <span key={index} className="px-2 py-1">
              ...
            </span>
          );
        }

        const pageNumber = p as number;
        return (
          <button
            key={index}
            onClick={() => onPageChange(pageNumber)}
            className={` w-[42px] h-[42px] flex justify-center items-center  border border-cerulean  transition-colors text-sm hover:bg-cerulean hover:text-white duration-200 ease-in-out
              ${pageNumber === page ? "bg-cerulean text-white" : "bg-white text-textColor"}`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-[23px]  border border-cerulean text-cerulean disabled:opacity-50 flex items-center hover:bg-cerulean hover:text-white duration-200 ease-in-out disabled:hover:bg-transparent disabled:hover:text-cerulean text-sm"
      >
        Дальше
        <span className="ml-2 ">
          <ArrowRightIcon />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
