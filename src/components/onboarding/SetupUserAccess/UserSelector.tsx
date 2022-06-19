import { Settings, User } from '@/hooks/useOnBoarding'
import React, { useState } from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'
import styles from './UserSelector.module.css'

interface SelectValue {
  label: string
  value: string
}

interface UserFn {
  user: User
  getAreas: () =>
    | {
        value: string
        label: string
      }[]
    | undefined
  getScreens: (
    area?: SingleValue<{
      value: string
      label: string
    }>,
  ) => {
    value: string
    label: string
  }[]
  setSettings: React.Dispatch<React.SetStateAction<Settings>>
}
const UserSelector = ({ user, getAreas, getScreens, setSettings }: UserFn) => {
  const [selectedArea, setSelectedArea] =
    useState<SingleValue<SelectValue>>(null)

  const [selectedScreens, setSeletedScreens] =
    useState<MultiValue<SelectValue> | null>(null)

  const onChangeArea = (area: SingleValue<SelectValue>) => {
    setSelectedArea(area)
    setSeletedScreens(null)
  }

  const onChangeScreen = (screens: MultiValue<SelectValue>) => {
    if (selectedArea) {
      const userArea: string = selectedArea.value
      const userScreens = []
      for (const screen of screens) {
        userScreens.push(screen.value)
      }
      const newUser: User = {
        userName: user.userName,
        pin: user.pin,
        role: user.role,
        screens: { [userArea]: userScreens },
      }

      setSettings((state) => {
        const currentUsers = [...state.users]
        const filteredUsers = currentUsers.filter(
          (currentUser) => currentUser.userName !== user.userName,
        )
        return {
          ...state,
          users: [...filteredUsers, newUser],
        }
      })
      setSeletedScreens(screens)
    }
  }

  return (
    <div className={styles.container} key={user.userName}>
      <p>
        <strong>Usuario: </strong>
        {`${user.userName} `}
        <strong>Rol: </strong>
        {user.role}
      </p>
      <Select
        menuPosition='fixed'
        value={selectedArea}
        placeholder='Área'
        onChange={(e) => onChangeArea(e)}
        options={getAreas()}
      />
      <Select
        menuPosition='fixed'
        noOptionsMessage={() => 'No hay datos'}
        placeholder='Pantalla'
        value={selectedScreens}
        onChange={(e) => onChangeScreen(e)}
        isMulti
        options={getScreens(selectedArea)}
      />
    </div>
  )
}

export default UserSelector
