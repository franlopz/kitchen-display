/// <reference types="vite-plugin-svgr/client" />
import Card from '@/components/Card/Card'
import welcomStyles from './Welcome.module.css'
import { ReactComponent as SetupSvg } from '@/assets/setup.svg'
import Container from '../Container'
import Button from '@/components/global/Button/Button'
import { useContext } from 'react'
import { StepContextType, StepsContext } from '@/context/StepsContext'

const Welcome = () => {
  const { nextStep } = useContext(StepsContext) as StepContextType

  return (
    <Container>
      <Card>
        <div className={welcomStyles['content-column']}>
          <h3>Solo faltan unos pocos ajustes...</h3>
          <SetupSvg className={welcomStyles.svg} />
          <Button onClick={nextStep}>Comenzar</Button>
        </div>
      </Card>
    </Container>
  )
}

export default Welcome
