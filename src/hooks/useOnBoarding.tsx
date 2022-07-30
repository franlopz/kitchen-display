import { DataListProps } from '@/components/global/DataList/DataList'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SingleValue } from 'react-select'

export type Screen = [string, string]
export type Screens = Screen[] | null
export interface ScreenObject {
  [name: string]: string[]
}
export interface User {
  name: string
  pin: string
  role: string
  screens: ScreenObject
}

export interface Settings {
  users: User[]
  screens: ScreenObject
}

const useOnBoarding = () => {
  const roles: string[] = ['Admin', 'User', 'Guest']
  const [listAreas, setListAreas] = useState<DataListProps['label']>(null)
  const [listScreens, setListScreens] = useState<ScreenObject | null>(null)
  const [listUsers, setListUsers] = useState<User[] | null>(null)
  const [settings, setSettings] = useState<Settings>({ users: [], screens: {} })

  useEffect(() => {
    const areas = window.localStorage.getItem('areas')
    const screens = window.localStorage.getItem('screens')
    const users = window.localStorage.getItem('users')
    if (areas) setListAreas(JSON.parse(areas))
    if (screens) {
      const parsedScreens = JSON.parse(screens)
      setListScreens(parsedScreens)
      setSettings({ screens: parsedScreens, users: [] })
    }
    if (users) setListUsers(JSON.parse(users))
  }, [])

  const addScreen = (data: Screen) => {
    const newObject: ScreenObject = { ...listScreens }
    const area = data[0]
    const screen = data[1]
    if (listScreens) {
      if (listScreens[area]?.includes(screen)) return
      newObject[area] = [...(listScreens[area] ?? []), screen]
      window.localStorage.setItem('screens', JSON.stringify(newObject))
      setListScreens(newObject)
      return
    }
    newObject[area] = [screen]
    window.localStorage.setItem('screens', JSON.stringify(newObject))
    setListScreens(newObject)
  }

  const removeScreen = (item: string) => {
    const inputArray = item.split(' > ')
    const key = inputArray[0]
    const value = inputArray[1]
    const listScreensCopy = { ...listScreens }

    if (listScreensCopy) {
      const valueArray = listScreensCopy[key]
      if (valueArray.length === 1) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [key]: value, ...rest } = listScreensCopy
        if (Object.keys(rest).length === 0) {
          window.localStorage.removeItem('screens')
          return setListScreens(null)
        }
        window.localStorage.setItem('screens', JSON.stringify(rest))
        return setListScreens(rest)
      }
      const newArray = valueArray.filter((item) => item !== value)
      listScreensCopy[key] = newArray
      window.localStorage.setItem('screens', JSON.stringify(listScreensCopy))
      setListScreens(listScreensCopy)
    }
  }

  const addArea = (item: string) => {
    if (listAreas) {
      if (listAreas.includes(item) === false) {
        const newList = [...listAreas, item]
        window.localStorage.setItem('areas', JSON.stringify(newList))

        return setListAreas(newList)
      }
      return toast.error('Área ya existe')
    }
    window.localStorage.setItem('areas', JSON.stringify([item]))
    setListAreas([item])
  }

  const removeArea = (item: string) => {
    const newListItems = listAreas?.filter((value) => item !== value)
    if (newListItems) {
      if (newListItems.length > 0) {
        window.localStorage.setItem('areas', JSON.stringify(newListItems))
        window.localStorage.removeItem('screens')
        window.localStorage.removeItem('users')
        return setListAreas(newListItems)
      }
      window.localStorage.removeItem('areas')
      setListAreas(null)
    }
  }
  const addUser = (user: User) => {
    if (listUsers) {
      const pinExists = Boolean(
        listUsers?.find((eachUser) => eachUser.pin === user.pin),
      )
      const userExists = Boolean(
        listUsers?.find((eachUser) => eachUser.name === user.name),
      )
      if (pinExists) return toast.error('Pin ya existe')
      if (userExists) return toast.error('Nombre de usuario ya existe')

      const newUsers = [...listUsers, user]
      window.localStorage.setItem('users', JSON.stringify(newUsers))
      return setListUsers(newUsers)
    }
    window.localStorage.setItem('users', JSON.stringify([user]))
    setListUsers([user])
  }

  const removeUser = (label: string) => {
    const labelSplit = label.split(' > ')
    const name = labelSplit[0]
    const newListUsers = listUsers?.filter((user) => user.name !== name)
    if (newListUsers) {
      if (newListUsers.length > 0) {
        window.localStorage.setItem('users', JSON.stringify(newListUsers))
        return setListUsers(newListUsers)
      }
      window.localStorage.removeItem('users')
      return setListUsers(null)
    }
  }

  const getAreas = () => {
    if (listScreens) {
      const areasLabel: { value: string; label: string }[] = []
      const areas = [...Object.keys(listScreens)]
      areas.forEach((area) => areasLabel.push({ value: area, label: area }))
      return areasLabel
    }
  }

  const getScreens = (
    area: SingleValue<{
      value: string
      label: string
    }> = {
      value: 'Cocina',
      label: 'Cocina',
    },
  ) => {
    const screenLabels: { value: string; label: string }[] = []
    if (listScreens) {
      if (area?.value !== '' && area) {
        const screensArray = listScreens[area?.value]
        screensArray.forEach((screen) =>
          screenLabels.push({ value: screen, label: screen }),
        )
      }
    }
    return screenLabels
  }

  return {
    listAreas,
    addArea,
    removeArea,
    addScreen,
    removeScreen,
    listScreens,
    roles,
    listUsers,
    addUser,
    removeUser,
    getAreas,
    getScreens,
    setSettings,
    settings,
  }
}

export default useOnBoarding
