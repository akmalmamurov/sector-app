"use client";

import { useState, useEffect, useRef } from "react";
import { stepsData } from "@/data";
import MyCart from "./MyCart";
import CartContact from "./CartContact";
import CartDelivery from "./CartDelivery";
import CartOrder from "./CartOrder";
import { Container } from "../container";
import { Stepper } from "../stepper";
import useStore from "@/context/store";
import { showError } from "../toast/Toast";

const CartStepper = () => {
  const { auth } = useStore();
  const [activeStep, setActiveStep] = useState(0);

  const toastShown = useRef(false);

  const steps = stepsData || [];
  const isLastStep = activeStep === steps.length - 1;

  useEffect(() => {
    if (auth === false && !toastShown.current) {
      showError("Вы не авторизованы, рекомендуем авторизоваться");
      toastShown.current = true; 
    }
  }, [auth]);

  if (auth === undefined) return null;

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
      <Stepper steps={steps} activeStep={activeStep} />
      <div className="mt-[23px]">{renderCurrentStepContent()}</div>
    </Container>
  );
};

export default CartStepper;
