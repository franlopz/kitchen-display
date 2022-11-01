import { useAppSelector } from '@/redux/hooks/useRedux'
import { Navigate, Outlet } from 'react-router-dom'

const PinLayout = () => {
  const { user } = useAppSelector((state) => state.auth)

  if (!user?.userId && user?.setupCompleted) {
    return <Navigate to='/pin' />
  }

  return <Outlet />
}

export default PinLayout
