import toast from 'react-hot-toast'

const usePinLogin = () => {
  const login = async () => {
    toast.error('Pin incorrecto', { id: 'WrongPin' })
  }
  return { login }
}

export default usePinLogin
