import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Банковские реквизиты | Sector App",
  description: "Платежные реквизиты компании",
};

const BankAccounts = () => {
  return (
    <Container>
      <HomeCrumb paths={[{ name: "Банковские реквизиты" }]} />

      <Section className="mb-14">
        <InfoHeader className="mb-5">
          <InfoTitle>Банковские реквизиты</InfoTitle>
        </InfoHeader>
        <div className="pt-6 pl-6 pb-10 sm:pb-14 md:pb-36 text-textColor">
          <p className="font-bold">Bank details:</p>
          <p className="pt-4">
          Ташкент, Чиланзарский район, массив Чиланзар, 17-й квартал, 6
          </p>
          <p className="pt-4">ООО SECTOR TECHNOLOGY </p>
          <p className="pt-4">TAX IDENTIFICATION NUMBER 310813407</p>
          <p className="pt-4">TRANSIT CURRENCY ACCOUNT IN UZS</p>
          <p className="pt-4">Bank account: 20208000505699338001</p>
          <p className="pt-4">
            Beneficiary’s Bank: XATB «TRANSBANK» Sodiq Azimov Street, Tashkent, Mirzo Ulugbek, Tashkent, Uzbekistan
          </p>
        </div>
      </Section>
    </Container>
  );
};

export default BankAccounts;
