import React, { FC } from 'react'
import styles from './OnBoarding.module.css'

const Container: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles['content-page']}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}

export default Container
