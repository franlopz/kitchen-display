import { useAppSelector } from '@/redux/hooks/useRedux'
import React, { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface Props {
  children: React.ReactElement
  redirect: string
}
const AuthRoute: FC<Props> = ({ children, redirect }) => {
  const { user } = useAppSelector((state) => state.auth)
  const location = useLocation()

  if (!user && location.pathname === '/signup') {
    return children
  }

  if (user?.setupCompleted && user?.userId && location.pathname !== '/') {
    return <Navigate to='/' />
  }

  if (!user && location.pathname !== '/login') {
    return <Navigate to={redirect} />
  }

  if (
    user &&
    !user.userId &&
    !user.setupCompleted &&
    location.pathname !== '/setup'
  ) {
    return <Navigate to='/setup' />
  }

  if (
    user &&
    !user.userId &&
    user.setupCompleted &&
    location.pathname !== '/pin'
  ) {
    return <Navigate to='/pin' />
  }

  return children
}

export default AuthRoute
