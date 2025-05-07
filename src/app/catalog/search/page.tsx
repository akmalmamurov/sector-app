import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import SearchProduct from "@/components/search-product/SearchProduct";
import React from "react";

export default function SearchPage() {
  return (
    <section>
      <Container className="pb-[58px]">
        <HomeCrumb
          paths={[{ href: "/catalog", name: "Каталог" }, { name: "Поиск" }]}
        />
        <SearchProduct />
      </Container>
    </section>
  );
}
