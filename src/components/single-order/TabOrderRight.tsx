import { useState, useMemo } from "react";
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
  const [status, setStatus] = useState<"" | "all" | "new" | "closed">("all");

  // 1) Compute filteredRequests via useMemo for performance
  const filteredRequests = useMemo(() => {
    if (!order.requests) return [];

    return order.requests.filter((req) => {
      // 1a) Status filter: show all if status==='all'
      const statusMatch = status === "all" || req.status === status;

      // 1b) Search filter: case‑insensitive substring on topic
      const topicMatch = req.topic
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return statusMatch && topicMatch;
    });
  }, [order.requests, status, search]);

  return (
    <div>
      <div className="pt-5 pb-10 flex gap-[30px]">
        {/* Status Select */}
        <Select value={status} onValueChange={(val: "all" | "new" | "closed") => setStatus(val)}>
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

        {/* Topic Search */}
        <div className="relative w-[300px]">
          <Input
            type="text"
            placeholder="Поиск по теме"
            className="pr-10 text-[14px] leading-[25px] h-[41px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-darkSoul"
            size={20}
          />
        </div>

        {/* New Issue Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-cerulean text-white rounded-md w-[215px]"
        >
          Подать заявку
        </button>
      </div>

      {/* Create Issue Modal */}
      {isOpen && (
        <CreateIssues
          setOpen={setIsOpen}
          orderNumber={order.orderNumber}
        />
      )}

      {/* Pass filteredRequests to the table */}
      <ProfileIssueTable issues={filteredRequests} />
    </div>
  );
};

export default TabOrderRight;
