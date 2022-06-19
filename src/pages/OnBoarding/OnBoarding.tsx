import SetupAreas from '@/components/onboarding/SetupAreas/SetupAreas'
import SetupScreens from '@/components/onboarding/SetupScreens/SetupScreens'
import SetupUserAccess from '@/components/onboarding/SetupUserAccess/SetupUserAccess'
import SetupUsers from '@/components/onboarding/SetupUsers/SetupUsers'
import Welcome from '@/components/onboarding/Welcome/Welcome'
import { StepContextType, StepsContext } from '@/context/StepsContext'
import { useContext } from 'react'

interface StepRenderInterface {
  [key: number]: JSX.Element
}
const StepRender: StepRenderInterface = {
  1: <Welcome />,
  2: <SetupAreas />,
  3: <SetupScreens />,
  4: <SetupUsers />,
  5: <SetupUserAccess />,
}

const OnBoarding = () => {
  const { step } = useContext(StepsContext) as StepContextType
  return <>{StepRender[step]}</>
}

export default OnBoarding
