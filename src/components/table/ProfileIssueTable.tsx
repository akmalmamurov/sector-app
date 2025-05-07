import { IssuesData } from "@/types/issues";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ProfileDownIcon, ProfileUpIcon } from "@/assets/icons";
import { format } from "date-fns";
import { useState } from "react";
import { IssueModal } from "../modal";

export const ProfileIssueTable = ({ issues }: { issues: IssuesData[] }) => {
  console.log(issues);
  const [open, setOpen] = useState(false);
  const [element, setElement] = useState({});

  return (
    <Table className="w-full table-auto bg-white border-separate border-spacing-y-2">
      <TableHeader className="bg-whiteOut text-center ">
        <TableRow>
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues?.length > 0
          ? issues?.map((item) => (
              <TableRow key={item?.id}>
                <TableCell className="py-[7px] px-[10px] border-l border-t border-b text-center lg:w-[191px]">
                  <button
                    type="button"
                    onClick={() => {
                      setElement(item);
                      setOpen(true);
                    }}
                    className="border border-superSilver py-[6px] px-[17px] text-textColor"
                  >
                    {item?.orderNumber}
                  </button>
                </TableCell>
                <TableCell className="py-[7px] px-[10px] border-l border-t border-b text-center text-textColor">
                  {item?.requestNumber}
                </TableCell>
                <TableCell className="py-[7px] px-[10px] border-l border-t border-b text-center text-textColor">
                  {item?.topic}
                </TableCell>
                <TableCell className="py-[7px] px-[10px] border-l border-t border-b text-center text-textColor">
                  <span
                    className={`py-[6px] px-[17px] border ${item?.status === "new" ? "border-cerulean" : item?.status === "closed" ? "border-dangerColor" : "border-superSilver "} rounded-sm`}
                  >
                    {item?.status === "new"
                      ? "Новое"
                      : item?.status === "closed"
                        ? "Закрыто"
                        : "Закрыто"}
                  </span>
                </TableCell>
                <TableCell className="py-[7px] px-[10px] border-l border-t border-b text-center text-textColor">
                  {item?.messages?.length}
                </TableCell>
                <TableCell className="py-[7px] px-[10px] border-l border-t border-b text-center text-textColor">
                  {item.createdAt
                    ? format(new Date(item.createdAt), "dd.MM.yyyy HH:mm")
                    : "-"}
                </TableCell>
                <TableCell className="py-[7px] px-[10px] border-l border-t border-b text-center text-textColor border-r">
                  {item?.messages?.length
                    ? format(
                        new Date(
                          item.messages[item.messages.length - 1].createdAt
                        ),
                        "dd.MM.yyyy HH:mm"
                      )
                    : "-"}
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
      <IssueModal
        open={open}
        toggleModal={() => setOpen(!open)}
        issues={element}
      />
    </Table>
  );
};

export default ProfileIssueTable;
