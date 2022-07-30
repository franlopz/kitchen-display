import Card from '@/components/Card/Card'
import Button from '@/components/global/Button/Button'
import DataList from '@/components/global/DataList/DataList'
import Input from '@/components/global/Form/Input'
import Select from '@/components/global/Form/Select'
import useOnBoarding, { User } from '@/hooks/useOnBoarding'
import React, { useContext, useRef, useState } from 'react'
import Container from '../Container'
import styles from '../OnBoarding.module.css'
import { ReactComponent as AvatarSvg } from '@/assets/avatar.svg'
import DeleteIcon from '@/components/global/DeleteIcon/DeleteIcon'
import toast from 'react-hot-toast'
import { StepContextType, StepsContext } from '@/context/StepsContext'

const initialFormData = { name: '', pin: '', role: '', screens: {} }

const SetupUsers = () => {
  const { roles, listUsers, addUser, removeUser } = useOnBoarding()
  const [formData, setFormData] = useState(initialFormData)
  const ref = useRef<HTMLInputElement>(null)
  const { nextStep, previousStep } = useContext(StepsContext) as StepContextType

  const getLabels = (users: User[]) => {
    const usersLabel: string[] = []

    for (const user of users) {
      const name = user.name
      const pin = user.pin
      const role = user.role
      usersLabel.push(`${name} > ${pin} > ${role}`)
    }
    return usersLabel
  }

  const buttonsGenerator = [
    (value: string, name = 'delete') => {
      return <DeleteIcon onClick={() => removeUser(value)} key={name} />
    },
  ]

  const onClickHandler = () => {
    if (formData.pin && formData.role && formData.name) {
      setFormData(initialFormData)
      addUser(formData)
    }
    if (ref.current) ref.current.focus()
  }

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.target.value.includes('.') === false) {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const nextClickHandler = () => {
    const adminExists = Boolean(
      listUsers?.find((user) => user.role === 'Admin'),
    )
    if (adminExists === false) {
      return toast.error('Debe haber al menos un administrador', {
        id: 'adminError',
      })
    }
    nextStep()
  }
  return (
    <Container>
      <Card title='Configura los usuarios'>
        <div className={styles['column-content']}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className={styles['input-group']}>
              <Input
                variantStyle={styles['fix-height']}
                required={true}
                name='name'
                placeholder='Usuario'
                ref={ref}
                value={formData.name}
                onChange={onChangeHandler}
              />
              <Input
                variantStyle={styles['fix-height']}
                name='pin'
                type='number'
                step='1'
                required={true}
                min='0'
                placeholder='Pin'
                value={formData.pin}
                onChange={onChangeHandler}
              />
            </div>
            <div className={styles['select-group']}>
              <Select
                required={true}
                label='Rol'
                name='role'
                onChange={onChangeHandler}
                value={formData.role}
                data={roles}
              />
              <Button
                aditionalStyle={styles['fix-height']}
                onClick={onClickHandler}
              >
                Añadir
              </Button>
            </div>
          </form>
          {listUsers && (
            <div className={styles['data-container-smaller']}>
              <DataList
                label={getLabels(listUsers)}
                buttons={buttonsGenerator}
              />
              <div className={styles['buttons-container']}>
                <Button onClick={previousStep} aditionalStyle={styles.button}>
                  Atrás
                </Button>
                <Button
                  onClick={nextClickHandler}
                  aditionalStyle={styles.button}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
          {!listUsers && (
            <div className={styles['svg-container']}>
              <AvatarSvg className={styles.svg} />
            </div>
          )}
        </div>
      </Card>
    </Container>
  )
}

export default SetupUsers
