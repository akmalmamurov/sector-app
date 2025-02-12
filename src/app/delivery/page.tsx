import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
const data = [
  {
    title: "Условия и сроки ",
    list: [
      "Срок комплектации заказа зависит от наличия товара на складе",
      "Получить заказ можно после подтверждения его готовности менеджером",
      "Расчет сроков и стоимости доставки производится при оформлении заказа",
    ],
  },
  {
    title: "Обязательно наличие: ",
    list: ["документа удостоверяющего личность;", "оригинала доверенности;"],
  },
];
const DeliveryPage = () => {
  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Доставка товара" }]} />
      <Section className="py-6 px-0">
        <InfoHeader className="mb-5">
          <InfoTitle>Доставка товара</InfoTitle>
        </InfoHeader>
        <div className="p-6">
          <div>
            <h4 className="info-text mb-5">
              Для Вашего удобства мы предлагаем несколько способов доставки на
              выбор.
            </h4>
            <h2 className="info-title mb-5">Самовывоз</h2>
            <p className="info-text">
              Вы можете забрать груз самостоятельно или доверить это курьерской
              компании по адресу самовывоза.
            </p>
          </div>
          {/* table */}
          <Table className="mt-6 border border-gray-300 rounded-none overflow-hidden w-[774px]">
            <TableHeader>
              <TableRow className="bg-gray-100 text-left ">
                <TableHead className="p-4 text-center border-r"></TableHead>
                <TableHead className="px-3 py-4 text-left border-r font-bold text-xs text-textColor">
                  Адрес пунктов самовывоза
                </TableHead>
                <TableHead className="px-3 py-4  font-bold text-xs text-textColor">
                  Время работы пунктов самовывоза
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className=" text-sunColor text-2xl font-normal px-2.5 py-6 border-r">
                  Ташкент
                </TableCell>
                <TableCell className="px-3 py-6 border-r text-xs text-cerulean">
                  <p>
                    Мирзо-Улугбекский р-н, ул. Сайрам 7-тор (бывш. Э.Мараимова),
                    д.52
                  </p>
                  <Link href="tel:+998555080660" className="hover:underline">
                    +998 55 508 0660 (доб. 924)
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-6 text-xs font-normal text-textColor">
                  ПН-ПТ <br /> с 9:00 до 18:00 часов
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-20 ">
            {data.map((el, index) => (
              <div key={index} className="mb-8">
                <h3 className="font-bold text-textColor mb-4">{el.title}</h3>
                <ul className="pl-10">
                  {el.list.map((item) => (
                    <li key={item} className="list-disc info-text">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <h5 className="info-title mb-5">Доставка по Узбекистану</h5>
            <p className="info-text mb-4">
              Возможна доставка в любую точку Узбекистана. 
            </p>
            <p className="info-text mb-5">
              Стоимость и сроки доставки зависит от выбранной транспортной
              компании, города получателя и габаритов груза, уточняйте
              информацию у менеджера. 
            </p>
            <h5 className="info-title mb-5">
              Доставка грузов за пределы Узбекистана
            </h5>
            <p className="info-text">
              Мы организуем доставку оборудования в любую страну мира. Ваш
              менеджер НАГ поможет Вам оформить заявку на международную
              доставку.
            </p>
          </div>
          <div className="pl-5 mt-5">
                <div className="py-6 px-[22px] rounded-[10px] bg-christmas">
                        <p className="info-text">
                        Если у Вас остались вопросы или нужна помощь  с выбором способа доставки, менеджер, который работает с Вашим заказом,  предложит лучшее решение по
                        скорости, стоимости и надежности перевозки Вашего груза.
                        </p>
                </div>
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default DeliveryPage;
