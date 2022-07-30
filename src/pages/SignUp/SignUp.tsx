import Button from '@/components/global/Button/Button'
import Input from '@/components/global/Form/Input'
import { useAppDispatch } from '@/redux/hooks/useRedux'
import { signup } from '@/redux/slices/authSlice'
import { SignUpProps } from '@/services/auth'
import { ErrorMessage } from '@hookform/error-message'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import styles from './SignUp.module.css'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpProps>()

  const onSubmit: SubmitHandler<SignUpProps> = (data) => {
    dispatch(signup(data))
      .unwrap()
      .then(() => {
        toast.success('Account created successfully', {
          id: 'signup-success',
          duration: 1500,
        })
        navigate('/login')
      })
      .catch((error) =>
        toast.error(error, { id: 'signup-error', duration: 2000 }),
      )
  }

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          placeholder='Email'
          variantStyle={errors.email ? styles.required : ''}
          {...register('email', {
            required: 'Email required',
            pattern: {
              value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
              message: 'Invaid email',
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name='email'
          render={({ message }) => <p>{message}</p>}
        />
        <Input
          type='password'
          placeholder='Password'
          variantStyle={errors.password ? styles.required : ''}
          {...register('password', {
            required: 'Password required',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/,
              message:
                'Password must have at least 8 characters, at least letter and one number',
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name='password'
          render={({ message }) => <p>{message}</p>}
        />
        <Input
          type='password'
          placeholder='Confirm Password'
          variantStyle={errors.confirmPassword ? styles.required : ''}
          {...register('confirmPassword', {
            required: 'Confirm Password required',
            validate: (val: string) => {
              if (watch('password') !== val) {
                return 'Your passwords do no match'
              }
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name='confirmPassword'
          render={({ message }) => <p>{message}</p>}
        />
        <Input
          type='text'
          placeholder='Business name'
          variantStyle={errors.business ? styles.required : ''}
          {...register('business', {
            required: 'Business name required',
          })}
        />
        <ErrorMessage
          errors={errors}
          name='business'
          render={({ message }) => <p>{message}</p>}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}
export default SignUp
