"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRequireAuth } from "@/hooks";
import { useState } from "react";
import { CreateIssues } from "@/components/issues";
import { ProfileIssueTable } from "@/components/table";
import { useQuery } from "@tanstack/react-query";
import { getIssues } from "@/api";
import useStore from "@/context/store";
const IssuesPage = () => {
  useRequireAuth();
  const auth = useStore((s) => s.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const { data: issuesData = [] } = useQuery({
    queryKey: ["issues", search, status ],
    queryFn: () => getIssues(search, status === "all" ? "" : status),
    enabled: auth,
  });

  return (
    <section className="bg-white p-6">
      <div className="pt-5 pb-10 flex flex-col md:flex-row gap-[30px]">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full md:w-[300px] text-[14px] leading-[25px] h-[41px] focus:ring-cerulean">
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

        <div className="relative w-full md:w-[300px]">
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
          className="bg-cerulean text-white rounded-md w-full md:w-[215px] h-[41px]"
        >
          <span>Подать заявку</span>
        </button>
      </div>
      {isOpen && <CreateIssues setOpen={setIsOpen} />}
      <ProfileIssueTable issues={issuesData?.requests} />
    </section>
  );
};

export default IssuesPage;
