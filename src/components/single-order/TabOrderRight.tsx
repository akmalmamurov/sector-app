
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { CreateIssues } from "../issues";
import { ProfileIssueTable } from "../table";
import { OrdersData } from "@/types";
interface TabOrderRightProps {
  order: OrdersData;
}
export const TabOrderRight = ({ order }: TabOrderRightProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");


  return (
    <div>
      <div className="pt-5 pb-10 flex gap-[30px]">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[300px] text-[14px] leading-[25px] h-[41px] focus:ring-cerulean">
            <SelectValue placeholder="Выберите статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Все cтатусы</SelectItem>
              <SelectItem value="new">Новые</SelectItem>
              <SelectItem value="closed">Закрыто</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="relative w-[300px]">
          <Input
            type="text"
            placeholder="Введите поисковый запрос"
            className="pr-10 text-[14px] leading-[25px] h-[41px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-darkSoul"
            size={20}
          />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-cerulean text-white rounded-md w-[215px]"
        >
          <span>Подать заявку</span>
        </button>
      </div>
      {isOpen && <CreateIssues setOpen={setIsOpen} orderNumber={order?.orderNumber} />}
      <ProfileIssueTable issues={order?.requests} />
    </div>
  );
};

export default TabOrderRight;
