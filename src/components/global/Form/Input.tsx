import React, { forwardRef } from 'react'
import styles from './Form.module.css'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { variantStyle?: string }

type Ref = HTMLInputElement

const Input = forwardRef<Ref, Props>(({ variantStyle = '', ...rest }, ref) => {
  return (
    <input ref={ref} className={`${styles.input} ${variantStyle}`} {...rest} />
  )
})

Input.displayName = 'Input'
export default Input
