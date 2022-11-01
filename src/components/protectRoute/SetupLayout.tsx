import { useAppSelector } from '@/redux/hooks/useRedux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const SetupLayout = () => {
  const { user } = useAppSelector((state) => state.auth)
  const location = useLocation()

  if (
    user &&
    !user.userId &&
    !user.setupCompleted &&
    location.pathname !== '/setup'
  ) {
    return <Navigate to='/setup' />
  }

  return <Outlet />
}

export default SetupLayout
