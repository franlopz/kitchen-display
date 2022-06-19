import React, { FC } from 'react'
import styles from './Button.module.css'

const Button: FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { aditionalStyle?: string }
> = ({ children, aditionalStyle, ...rest }) => {
  return (
    <button className={`${styles.button} ${aditionalStyle}`} {...rest}>
      {children}
    </button>
  )
}

export default Button
