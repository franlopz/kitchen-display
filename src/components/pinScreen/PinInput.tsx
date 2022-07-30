import { useAppDispatch } from '@/redux/hooks/useRedux'
import React, { useEffect, useRef, useState } from 'react'
import styles from './PinInput.module.css'
import { checkToken, userLogin } from '@/redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const pinInputArray = ['first', 'second', 'third', 'fourth']

interface FormPin {
  first: string
  second: string
  third: string
  fourth: string
}
const initialData: FormPin = { first: '', second: '', third: '', fourth: '' }

const PinInput = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const refs = useRef([
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ])

  const [formPin, setFormPin] = useState<FormPin>(initialData)

  useEffect(() => {
    refs?.current[0]?.current?.focus()
  }, [])

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = formPin[e.target.name as keyof FormPin]
    const isNumber = e.target.value.search(/[0-9]/i)
    if (
      (currentValue.length === 0 && isNumber === 0) ||
      (currentValue !== '' && e.target.value === '')
    ) {
      setFormPin((state) => ({ ...state, [e.target.name]: e.target.value }))
      if (e.target.name === 'first') refs?.current[1]?.current?.focus()
      if (e.target.name === 'second') refs?.current[2]?.current?.focus()
      if (e.target.name === 'third') refs?.current[3]?.current?.focus()
      if (e.target.name === 'fourth') {
        refs?.current[3]?.current?.blur()
        const pin = Object.values(formPin)
        pin.push(e.target.value)
        const pinString = pin.join('')

        setFormPin(initialData)
        refs?.current[0]?.current?.focus()

        await dispatch(checkToken())
          .unwrap()
          .then()
          .catch((error) => {
            toast.error(error)
            navigate('/logout')
            throw new Error('token invalid')
          })

        await dispatch(userLogin(pinString))
          .unwrap()
          .then(() => navigate('/'))
          .catch((error) => {
            console.log(error)
            toast.error(error, { id: 'login-error', duration: 1500 })
          })
      }
    }
  }

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const clearPin = () => {
    setFormPin(initialData)
    refs?.current[0]?.current?.focus()
  }

  const onClickHandler = () => {
    const pinValues = Object.values(formPin)
    const emptyIndex = pinValues.findIndex((value) => value === '')
    refs?.current[emptyIndex]?.current?.focus()
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={styles['pin-input-container']}>
        {pinInputArray.map((inputName, index) => {
          return (
            <input
              key={inputName}
              value={formPin[inputName as keyof FormPin]}
              ref={refs.current[index]}
              onChange={onChangeHandler}
              onClick={onClickHandler}
              name={inputName}
              type='password'
              inputMode='numeric'
              className={styles.input}
            />
          )
        })}
      </div>
      <button type='button' onClick={clearPin} className={styles.button}>
        Borrar
      </button>
    </form>
  )
}

export default PinInput
