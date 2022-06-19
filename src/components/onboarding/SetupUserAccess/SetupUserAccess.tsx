import Card from '@/components/Card/Card'
import useOnBoarding from '@/hooks/useOnBoarding'
import Container from '../Container'
import styles from '../OnBoarding.module.css'
import Button from '@/components/global/Button/Button'
import UserSelector from './UserSelector'
import usePostSettings from '@/hooks/usePostSettings'
import { useContext } from 'react'
import { StepContextType, StepsContext } from '@/context/StepsContext'

const SetupUserAccess = () => {
  const { listUsers, getAreas, getScreens, setSettings, settings } =
    useOnBoarding()
  const { postSettings } = usePostSettings()
  const { previousStep } = useContext(StepsContext) as StepContextType

  return (
    <Container>
      <Card title='Configura los accesos'>
        <div className={styles['column-content']}>
          <div className={styles['user-access-container']}>
            <div className={styles['users-select-container']}>
              {listUsers?.map((user) => (
                <UserSelector
                  key={user.userName}
                  user={user}
                  getAreas={getAreas}
                  getScreens={getScreens}
                  setSettings={setSettings}
                />
              ))}
            </div>
            <div className={styles['buttons-container']}>
              <Button onClick={previousStep} aditionalStyle={styles.button}>
                Atrás
              </Button>
              <Button
                onClick={() => {
                  postSettings(settings, listUsers?.length ?? 0)
                }}
                aditionalStyle={styles.button}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  )
}

export default SetupUserAccess
