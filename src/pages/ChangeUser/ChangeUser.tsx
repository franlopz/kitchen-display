import { useAppDispatch } from '@/redux/hooks/useRedux'
import { changeUser } from '@/redux/slices/authSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangeUser = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(changeUser())
      .unwrap()
      .then(() => navigate('/pin'))
  }, [dispatch, navigate])

  return <></>
}

export default ChangeUser
