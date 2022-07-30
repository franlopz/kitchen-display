import Card from '@/components/Card/Card'
import useOnBoarding from '@/hooks/useOnBoarding'
import Container from '../Container'
import styles from '../OnBoarding.module.css'
import Button from '@/components/global/Button/Button'
import UserSelector from './UserSelector'
import usePostSettings from '@/hooks/usePostSettings'
import { useContext } from 'react'
import { StepContextType, StepsContext } from '@/context/StepsContext'
import { useAppDispatch } from '@/redux/hooks/useRedux'
import { initUsers } from '@/redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const SetupUserAccess = () => {
  const { listUsers, getAreas, getScreens, setSettings, settings } =
    useOnBoarding()
  const navigate = useNavigate()
  const { postSettings } = usePostSettings()
  const dispatch = useAppDispatch()
  const { previousStep } = useContext(StepsContext) as StepContextType

  const handleSubmit = async () => {
    if (
      settings.users.length > 0 &&
      settings.users.length !== listUsers?.length &&
      listUsers
    ) {
      toast.error('Incomplete data', { id: 'incompleteData' })
      return
    }
    dispatch(initUsers(settings))
      .unwrap()
      .then(() => navigate('/pin'))
      .catch((error) => {
        toast.error(error, { id: 'init-error', duration: 1500 })
      })
  }

  return (
    <Container>
      <Card title='Configura los accesos'>
        <div className={styles['column-content']}>
          <div className={styles['user-access-container']}>
            <div className={styles['users-select-container']}>
              {listUsers?.map((user) => (
                <UserSelector
                  key={user.name}
                  user={user}
                  getAreas={getAreas}
                  getScreens={getScreens}
                  setSettings={setSettings}
                />
              ))}
            </div>
            <div className={styles['buttons-container']}>
              <Button onClick={previousStep} aditionalStyle={styles.button}>
                Back
              </Button>
              <Button onClick={handleSubmit} aditionalStyle={styles.button}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  )
}

export default SetupUserAccess
