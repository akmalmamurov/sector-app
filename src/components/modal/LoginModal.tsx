/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Login from "./Login";
import LoginPassword from "./LoginPassword";
import LoginReset from "./LoginReset";

interface Props {
  isOpen: boolean;
  handleOpen: () => void;
}

const formSchemaStep1 = z.object({
  contact: z
    .string()
    .min(1, "Поле обязательно для заполнения")
    .refine((val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return emailRegex.test(val) || phoneRegex.test(val);
    }, "Введите корректный E-mail или номер телефона"),
});

const formSchemaStep2 = z.object({
  email: z.string().email("Введите корректный E-mail"),
  password: z.string().min(4, "Пароль должен содержать минимум 4 символов"),
});

const formSchemaStep3 = z.object({
  resetEmail: z.string().email("Введите корректный E-mail"),
});

const LoginModal = ({ isOpen, handleOpen }: Props) => {
  const [step, setStep] = useState(1);

  const formStep1 = useForm({
    resolver: zodResolver(formSchemaStep1),
    defaultValues: { contact: "" },
  });

  const formStep2 = useForm({
    resolver: zodResolver(formSchemaStep2),
    defaultValues: { email: "", password: "" },
  });

  const formStep3 = useForm({
    resolver: zodResolver(formSchemaStep3),
    defaultValues: { resetEmail: "" },
  });
  const resetForm = () => {
    formStep1.reset();
    formStep2.reset();
    formStep3.reset();
  };

  const handleClose = (newStep?: number) => {
    if (newStep) {
      setStep(newStep);
      resetForm();
    } else {
      setStep(1);
    }
  };

  const fullClose = ()=>{
    handleOpen();
    resetForm();
  }
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      resetForm();
    }
  }, [isOpen]); 

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[500px] rounded-none sm:rounded-none p-0">
        {step === 1 && (
          <Login handleClose={handleClose} formMethods={formStep1} fullClose={fullClose}/>
        )}
        {step === 2 && (
          <LoginPassword handleClose={handleClose} formMethods={formStep2} fullClose={fullClose}/>
        )}
        
        {step === 3 && (
          <LoginReset  formMethods={formStep3} fullClose={fullClose}/>
        )}
        {step === 4 && (
          <LoginReset  formMethods={formStep3} fullClose={fullClose}/>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
