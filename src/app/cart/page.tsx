"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { Stepper } from "@/components/stepper";
import { stepsData } from "@/data";
import { CartContact, CartDelivery, MyCart } from "@/components/cart-step";
import CartOrder from "@/components/cart-step/CartOrder";

const CartPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < stepsData.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <Container className="pt-5 pb-[58px]">
      <Stepper steps={stepsData} activeStep={activeStep} />
      <div className="mt-[23px]">
        {activeStep === 0 && <MyCart  handleNext={handleNext} />}
        {activeStep === 1 && <CartContact />}
        {activeStep === 2 && <CartDelivery />}
        {activeStep === 3 && <CartOrder />}
      </div>
    </Container>
  );
};

export default CartPage;
