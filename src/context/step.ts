import { create } from "zustand";

interface StepState {
  currentStep: 1 | 2 | null;
  setStep: (step: 1 | 2) => void;
}

const useStepStore = create<StepState>((set) => ({
  currentStep: null,
  setStep: (step) => set({ currentStep: step }),
}));

export default useStepStore;
