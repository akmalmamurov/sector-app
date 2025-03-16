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
import { PageLoader } from "../loader";

const CartStepper = () => {
  const { auth, clearDataAfterTimeout } = useStore();
  const [activeStep, setActiveStep] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const authErrorShown = useRef(false);
  useEffect(() => {
    if (!auth) {
      clearDataAfterTimeout();
    }
  }, [auth, clearDataAfterTimeout]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (auth === false && !authErrorShown.current) {
      showError("Вы не авторизованы, рекомендуем авторизоваться");
      authErrorShown.current = true;
    }
  }, [auth]);

  const steps = stepsData || [];
  const isLastStep = activeStep === steps.length - 1;

  if (!isClient) {
    return <PageLoader />;
  }

  if (auth === undefined) return null;

  const handleNextStep = () => {
    if (!isLastStep) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };
  const handlePrevStep = () => {
    if (activeStep) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const renderCurrentStepContent = () => {
    switch (activeStep) {
      case 0:
        return <MyCart step={activeStep} onNextStep={handleNextStep} />;
      case 1:
        return (
          <CartContact
            step={activeStep}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <CartDelivery
            step={activeStep}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
          />
        );
      case 3:
        return <CartOrder onPrevStep={handlePrevStep} step={activeStep} />;
      default:
        return null;
    }
  };

  return (
    <Container className="pt-5 pb-[58px]">
      <div className="hidden lg:block">
        <Stepper steps={steps} activeStep={activeStep} />
      </div>
      <div className="mt-[23px]">{renderCurrentStepContent()}</div>
    </Container>
  );
};

export default CartStepper;
