import toast from 'react-hot-toast'
import { Settings } from './useOnBoarding'

const usePostSettings = () => {
  const isDataCompleted = (data: Settings, usersLength: number): boolean => {
    let completed = false

    if (data.users.length > 0 && data.users.length === usersLength) {
      for (const user of data.users) {
        if (Object.values(user.screens)[0].length > 0) {
          completed = true
        } else {
          completed = false
          return completed
        }
      }
    }

    if (Object.keys(data.screens).length === 0) completed = false
    return completed
  }

  const postSettings = (data: Settings, usersLength: number) => {
    // console.log(data)
    const dataCompleted = isDataCompleted(data, usersLength)
    console.log(dataCompleted)
    console.log(data)

    if (dataCompleted === false)
      toast.error('Datos incompletos', { id: 'incompletedData' })
  }

  return { postSettings }
}

export default usePostSettings
