import React, { FC } from 'react'
import styles from './Card.module.css'

interface Props {
  title?: string
  footer?: React.ReactNode
  children: React.ReactNode
}
const Card: FC<Props> = ({ children, title, footer }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.children}>{children}</div>
      {footer}
    </div>
  )
}

export default Card
