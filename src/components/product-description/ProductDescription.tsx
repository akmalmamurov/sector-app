import { useState, useEffect, useRef } from "react";

const sections = [
  { id: "description", label: "Описание" },
  { id: "specs", label: "Характеристики" },
  { id: "related", label: "Сопутствующие товары" },
  { id: "reviews", label: "Отзывы" },
  { id: "questions", label: "Вопросы" },
];
export function ProductDescription(){
  const [activeTab, setActiveTab] = useState("description");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // 30% ko'rinishi yetarli
    );
    const currentRefs = sectionRefs.current;

    sections.forEach(({ id }) => {
      if (currentRefs[id]) {
        observer.observe(currentRefs[id]);
      }
    });

    return () => {
      sections.forEach(({ id }) => {
        if (currentRefs[id]) {
          observer.unobserve(currentRefs[id]);
        }
      });
    };
  }, []);
  return (
   <>
    <div>
      {/* Tab Navigation */}
      <div className="sticky top-[8.12rem] z-[5] bg-white shadow-md flex border-b">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            className={`px-5 py-3.5 text-center border-b-2 transition-all relative inline-block ${
              activeTab === id ? "text-cerulean title_gradient" : "border-transparent"
            }`}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="p-4 space-y-20">
        {sections.map(({ id, label }) => (
          <div
            key={id}
            id={id}
            ref={(el) => {
              sectionRefs.current[id] = el;
            }}
            className="h-[10rem]"
          >
            <h2 className="text-2xl font-bold mb-4">{label}</h2>
            <p>Контент для раздела {label}...</p>
          </div>
        ))}
      </div>
    </div>
   </>
  )
}
