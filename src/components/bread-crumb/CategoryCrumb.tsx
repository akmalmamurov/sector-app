"use client";
import Link from "next/link";
import { CatalogData, CategoryData } from "@/types";

interface BreadcrumbHoverMenuProps {
  subcatalogs: CatalogData[];
  categories: CategoryData[];
  parentSlug?: string; // Kategoriya linklari uchun kerak bo‘ladi
}

export default function BreadcrumbHoverMenu({
  subcatalogs,
  categories,
  parentSlug,
}: BreadcrumbHoverMenuProps) {
  return (
    <div className="absolute top-full left-0 bg-white border shadow-md p-2 w-full min-w-[280px]">
      {/* Subcatalog bo‘limi */}
      {subcatalogs.length > 0 && (
        <>
          <div className="font-semibold text-sm mb-1">Subcataloglar</div>
          <ul className="mb-2">
            {subcatalogs.map((sub) => (
              <li key={sub.id} className="my-1">
                <Link
                  href={`/catalog/${sub.slug}`}
                  className="text-xs text-weekColor hover:underline"
                >
                  {sub.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Category bo‘limi */}
      {categories.length > 0 && (
        <>
          <div className="font-semibold text-sm mb-1">Kategoriya</div>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id} className="my-1">
                {/* parentSlug bo‘lmasa, oddiy /catalog/[category-slug] ko‘rinishida link berilishi mumkin */}
                <Link
                  href={`/catalog/${parentSlug ?? ""}/${cat.slug}`}
                  className="text-xs text-weekColor hover:underline"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
