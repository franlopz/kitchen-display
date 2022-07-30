import Input from '@/components/global/Form/Input'
import formStyles from '@/components/global/Form/Form.module.css'
import loginStyles from './Login.module.css'
import { AiOutlineLoading } from 'react-icons/ai'
import { IoMdLogIn } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { login } from '@/redux/slices/authSlice'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/useRedux'
import toast from 'react-hot-toast'
import { LoginProps } from '@/services/auth'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.auth)

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => navigate('/pin'))
      .catch(() =>
        toast.error('Invalid email or password', {
          id: 'login-error',
          duration: 1500,
        }),
      )
  }
  const signupClick = () => {
    navigate('/signup')
  }

  return (
    <div className={loginStyles.container}>
      <h2>Welcome to KDS</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={loginStyles['form-container']}>
          <Input
            placeholder='Email'
            type='text'
            variantStyle={formStyles.email}
            {...register('email', {
              required: 'Email required',
              pattern: {
                value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                message: 'Invalid email',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name='email'
            render={({ message }) => <p>{message}</p>}
          />
          <div className={loginStyles['input-container']}>
            <Input
              placeholder='Password'
              type='password'
              variantStyle={formStyles.password}
              {...register('password', {
                required: 'Password required',
              })}
            />
            <button type='submit' className={loginStyles.button}>
              {loading === false ? (
                <IoMdLogIn className={loginStyles.icon} />
              ) : (
                <AiOutlineLoading
                  className={`${loginStyles.icon} ${loginStyles.loading}`}
                />
              )}
            </button>
            <ErrorMessage
              errors={errors}
              name='password'
              render={({ message }) => <p>{message}</p>}
            />
          </div>
        </div>
      </form>
      <div onClick={signupClick} className={loginStyles.signup}>
        <h4>Sign Up</h4>
      </div>
    </div>
  )
}

export default Login
