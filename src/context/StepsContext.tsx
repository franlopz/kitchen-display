import React, { createContext, FC, useState } from 'react'

export type Step = number
export type StepContextType = {
  step: Step
  nextStep: () => void
  previousStep: () => void
}
export const StepsContext = createContext<StepContextType | null>(null)

interface Props {
  children: React.ReactNode
}
export const StepsProvider: FC<Props> = ({ children }) => {
  const [step, setStep] = useState<Step>(1)

  const nextStep = () => {
    setStep((step) => step + 1)
  }

  const previousStep = () => {
    setStep((step) => step - 1)
  }

  return (
    <StepsContext.Provider value={{ step, nextStep, previousStep }}>
      {children}
    </StepsContext.Provider>
  )
}
