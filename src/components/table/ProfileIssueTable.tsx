import { Table, TableBody, TableHead, TableHeader } from "../ui/table";
import { ProfileDownIcon, ProfileUpIcon } from "@/assets/icons";

export const ProfileIssueTable = () => {
  return (
    <Table className="w-full table-auto bg-white border-separate border-spacing-y-2">
      <TableHeader className="bg-whiteOut text-center ">
        <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[25px] h-[50px] text-textColor relative">
          <span>Номер</span>
          <div className=" absolute right-3 top-1/2 -translate-y-1/2 flex flex-col justify-center gap-[3px]">
            <button>
              <ProfileUpIcon />
            </button>
            <button>
              <ProfileDownIcon />
            </button>
          </div>
        </TableHead>
        <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[25px] h-[50px] text-textColor ">
          <span>Заказы</span>
        </TableHead>
        <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[25px] h-[50px] text-textColor ">
          <span>Тема</span>
        </TableHead>
        <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[25px] h-[50px] text-textColor ">
          <span>Статус</span>
        </TableHead>
        <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[25px] h-[50px] text-textColor ">
          <span>Ответов</span>
        </TableHead>
        <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[25px] h-[50px] text-textColor ">
          <span>Подана</span>
        </TableHead>
        <TableHead className="px-[10px] py-[7px] text-center border border-superSilver text-sm leading-[25px] h-[50px] text-textColor ">
          <span>Последний ответ</span>
        </TableHead>
      </TableHeader>
      <TableBody></TableBody>
    </Table>
  );
};

export default ProfileIssueTable;
