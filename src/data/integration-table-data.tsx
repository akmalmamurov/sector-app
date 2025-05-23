import Link from "next/link";

interface Props {
  title: string;
  description: string;
  image: string;
}
export const integrationTable: Props[] = [
  {
    title: "ПРОЕКТИРОВАНИЕ",
    description:
      "Компания SECTOR TECHNOLOGY выполняет полный комплекс проектно-изыскательских работ в области строительства объектов связи и центров обработки данных: от общих идей и полноценных концептов до формирования комплектов исполнительной и эксплуатационной документации. В ходе проектирования специалисты компании плотно взаимодействуют с заказчиком. Учитываются и тщательно прорабатываются тысячи требований для комфортной, эффективной и безопасной работы служб эксплуатации.",
    image: "/integration1.png",
  },
  {
    title: "СТРОИТЕЛЬНО-МОНТАЖНЫЕ РАБОТЫ",
    description:
      "Специалисты SECTOR TECHNOLOGY имеют большой опыт в реализации комплекса строительно-монтажных работ полного цикла, включая сдачу в эксплуатацию.",
    image: "/integration2.png",
  },
  {
    title: "ПУСКОНАЛАДОЧНЫЕ РАБОТЫ",
    description:
      "Пусконаладочные работы от SECTOR TECHNOLOGY — комплекс мероприятий, включающий проверку, настройку и тестирование оборудования для последующей передачи в эксплуатацию.",
    image: "/integration3.png",
  },
  {
    title: "АУДИТ ИНФРАСТРУКТУРЫ",
    description:
      "Компания SECTOR TECHNOLOGY выполняет независимую экспертизу инфраструктуры с последующей подготовкой отчётов о её техническом состоянии.",
    image: "/integration4.png",
  },
];

export const integrationBottom = [
  {
    title: "ИНЖЕНЕРНАЯ ИНФРАСТРУКТУРА",
    images: "/integration5.png",
    list: [
      {
        text: "Дата-центр под ключ",
      },
      {
        text: (
          <>
            <Link
              href="/catalog"
              className="text-cerulean hover:underline hoverEffect"
            >
              Контейнерный/модульный ЦОД
            </Link>
          </>
        ),
      },
      {
        text: (
          <>
            <Link
              href="/catalog"
              className="text-cerulean hover:underline hoverEffect"
            >
              Системы кондиционирования
            </Link>
          </>
        ),
      },
      {
        text: (
          <>
            <Link
              href="/catalog"
              className="text-cerulean hover:underline hoverEffect"
            >
              Системы бесперебойного и гарантийного электропитания
            </Link>
          </>
        ),
      },
      {
        text: "Системы изолированных коридоров",
      },
      {
        text: "Низковольтное комплектное устройство",
      },
    ],
  },
  {
    title: "СЕТИ СВЯЗИ",
    images: "/integration6.png",
    list: [
      {
        text: "PON под ключ",
      },
      {
        text: "IP телефония под ключ",
      },
      {
        text: "Интеллектуальное видеонаблюдение",
      },
      {
        text: "Видеонаблюдение - проектирование и интеграция",
      },
      {
        text: "Структурированные кабельные системы и ВОЛС",
      },
      {
        text: "Локальная сеть под ключ",
      },
      {
        text: "Радиопланирование и беспроводнные СПД",
      },
    ],
  },
];
