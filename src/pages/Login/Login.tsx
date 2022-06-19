import Input from '@/components/global/Form/Input'
import formStyles from '@/components/global/Form/Form.module.css'
import loginStyles from './Login.module.css'
import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { IoMdLogIn } from 'react-icons/io'
const loading = true // TODO: REMOVE WHEN STATE IMPLEMENTED
const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className={loginStyles.container}>
      <h2>Bienvenido a KDS</h2>
      <form onSubmit={handleSubmit}>
        <div className={loginStyles['form-container']}>
          <Input
            placeholder='Email'
            type='email'
            variantStyle={formStyles.email}
          />
          <div className={loginStyles['input-container']}>
            <Input
              placeholder='Password'
              type='password'
              variantStyle={formStyles.password}
            />
            <button className={loginStyles.button}>
              {loading ? (
                <IoMdLogIn className={loginStyles.icon} />
              ) : (
                <AiOutlineLoading
                  className={`${loginStyles.icon} ${loginStyles.loading}`}
                />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
