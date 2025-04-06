"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
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
import { OrderRequest } from "@/types";

interface FormData {
  city: string;
}

const stepValidationFields: { [key: number]: (keyof FormData)[] } = {
  0: ["city"],
};

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
    const timer = setTimeout(() => {
      if (auth === false && !authErrorShown.current) {
        showError("Вы не авторизованы, рекомендуем авторизоваться");
        authErrorShown.current = true;
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [auth]);

  const steps = stepsData || [];
  const isLastStep = activeStep === steps.length - 1;

  const methods = useForm<OrderRequest>();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data:", data);
  };

  if (!isClient) {
    return <PageLoader />;
  }
  if (auth === undefined) return null;

  const handleNextStepValidation = async () => {
    const fields = stepValidationFields[activeStep] || [];
    const isValid = await trigger(fields);
    if (isValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const commonFormProps = { register, control, errors, watch, setValue };

  const renderCurrentStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <MyCart
            step={activeStep}
            onNextStep={handleNextStepValidation}
            {...commonFormProps}
          />
        );
      case 1:
        return (
          <CartContact
            step={activeStep}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStepValidation}
            {...commonFormProps}
          />
        );
      case 2:
        return (
          <CartDelivery
            step={activeStep}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStepValidation}
            {...commonFormProps}
          />
        );
      case 3:
        return (
          <CartOrder
            step={activeStep}
            onPrevStep={handlePrevStep}
            {...commonFormProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container className="pt-5 pb-[58px]">
      <div className="hidden lg:block">
        <Stepper steps={steps} activeStep={activeStep} />
      </div>
      {/* Wrap the form with FormProvider to ensure useFormContext works */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[23px]">
          {renderCurrentStepContent()}
          {isLastStep && (
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>
          )}
        </form>
      </FormProvider>
    </Container>
  );
};

export default CartStepper;
