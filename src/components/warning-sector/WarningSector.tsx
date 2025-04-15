import { SectorWarning } from "@/assets/icons";

export const WarningSector = () => {
  return (
    <div className="pt-20 px-4 flex gap-[15px] items-start">
      <span className="pt-[6px]">
        <SectorWarning />
      </span>
      <div>
        <p className="text-darkSoul leading-[18px] text-xs font-normal">
          Уважаемые покупатели. <br /> Обращаем Ваше внимание, что размещенная на
          данном сайте справочная информация о товарах не является офертой,
          наличие и стоимость оборудования необходимо уточнить у менеджеров
           "Sector Узбекистан", которые с удовольствием помогут Вам в выборе
          оборудования и оформлении на него заказа.
        </p>
        <p className="text-darkSoul leading-[18px] text-xs font-normal mt-4">
          Производитель оставляет за собой право изменять внешний вид,
          технические характеристики и комплектацию без уведомления.
        </p>
      </div>
    </div>
  );
};

export default WarningSector;
