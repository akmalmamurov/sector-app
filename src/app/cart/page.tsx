"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { Stepper } from "@/components/stepper";
import { stepsData } from "@/data";
import { CartContact, CartDelivery, MyCart } from "@/components/cart-step";
import CartOrder from "@/components/cart-step/CartOrder";

const CartPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === stepsData.length - 1;

  const handleNextStep = () => {
    if (!isLastStep) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const renderCurrentStepContent = () => {
    switch (activeStep) {
      case 0:
        return <MyCart onNextStep={handleNextStep} />;
      case 1:
        return <CartContact onNextStep={handleNextStep} />;
      case 2:
        return <CartDelivery onNextStep={handleNextStep} />;
      case 3:
        return <CartOrder />;
      default:
        return null;
    }
  };

  return (
    <Container className="pt-5 pb-[58px]">
      <Stepper steps={stepsData} activeStep={activeStep} />
      <div className="mt-[23px]">
        {renderCurrentStepContent()}
      </div>
    </Container>
  );
};

export default CartPage;