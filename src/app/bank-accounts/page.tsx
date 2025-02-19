import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import React from "react";

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
            100105, Uzbekistan, Tashkent, Mirzo-Ulugbek district, Sayram 7-tor,
            52
          </p>
          <p className="pt-4">ООО NAGTECH </p>
          <p className="pt-4">TAX IDENTIFICATION NUMBER 309565073</p>
          <p className="pt-4">TRANSIT CURRENCY ACCOUNT IN UZS</p>
          <p className="pt-4">Bank account: 20208000505529326001</p>
          <p className="pt-4">
            Beneficiary’s Bank: XATB «ORIENT FINANS» Uzbekistan, Tashkent,
            M-Ulugbek district, Osiyo street 5.
          </p>
        </div>
      </Section>
    </Container>
  );
};

export default BankAccounts;
