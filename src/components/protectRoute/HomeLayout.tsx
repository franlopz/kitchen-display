import { useAppSelector } from '@/redux/hooks/useRedux'
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  redirect: string
}
const HomeLayout: FC<Props> = ({ redirect }) => {
  const { user } = useAppSelector((state) => state.auth)

  if (user) return <Navigate to={redirect} />

  return <Outlet />
}

export default HomeLayout
