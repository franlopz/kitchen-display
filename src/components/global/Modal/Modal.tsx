import Card from '@/components/Card/Card'
import React, { FC } from 'react'
import styles from './Modal.module.css'

interface Props {
  children: React.ReactNode
  title?: string
  isOpen: boolean
}

const Modal: FC<Props> = ({ children, title, isOpen = false }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.background}>
      <div className={styles['card-size']}>
        <Card title={title}>{children}</Card>
      </div>
    </div>
  )
}

export default Modal
