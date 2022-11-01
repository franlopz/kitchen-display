import { useAppDispatch, useAppSelector } from '@/redux/hooks/useRedux'
import { logout } from '@/redux/slices/authSlice'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const Logout = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  if (loading) {
    return null
  }

  return <Navigate to='/login' />
}

export default Logout
