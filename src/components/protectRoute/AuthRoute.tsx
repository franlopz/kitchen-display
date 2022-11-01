import { useAppSelector } from '@/redux/hooks/useRedux'
import React, { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  children?: React.ReactElement
  redirect: string
}
const AuthRoute: FC<Props> = ({ children, redirect }) => {
  const { user } = useAppSelector((state) => state.auth)

  if (!user) {
    return <Navigate to={redirect} />
  }
  return children || <Outlet />
}

export default AuthRoute
