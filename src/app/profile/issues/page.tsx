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
const IssuesPage = () => {
  useRequireAuth();

  const [isOpen, setIsOpen] = useState(false);
  const { data: issuesData = [] } = useQuery({
    queryKey: ["issues"],
    queryFn: () => getIssues(),
  });
  console.log(issuesData);
  
  return (
    <section className="bg-white p-6">
      <div className="pt-5 pb-10 flex gap-[30px]">
        <Select>
          <SelectTrigger className="w-[300px] text-[14px] leading-[25px] h-[41px]">
            <SelectValue placeholder="Выберите статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="relative w-[300px]">
          <Input
            type="text"
            placeholder="Введите поисковый запрос"
            className="pr-10 text-[14px] leading-[25px] h-[41px]"
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
      {isOpen && <CreateIssues setOpen={setIsOpen} />}
      <ProfileIssueTable />
    </section>
  );
};

export default IssuesPage;
