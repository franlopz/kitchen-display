import useOrders from '@/hooks/useOrders'
import { FC } from 'react'
import styles from './OrderCard.module.css'

interface Props {
  number: number
  type: string
  waiter: string
  table: string
  date: string
  screen: string
}

const Header: FC<Props> = ({ number, type, waiter, table, date, screen }) => {
  const { getStatus, elapsedTime } = useOrders({ date })

  return (
    <div className={`${styles.header} ${getStatus(screen)}`}>
      <div className={styles['header-row']}>
        <p className={styles.number}>#{number}</p>
        <p className={styles.type}>{type}</p>
        <p>{waiter}</p>
      </div>
      <div className={styles['header-row']}>
        <p>{table}</p>
        <p>{elapsedTime}</p>
      </div>
    </div>
  )
}

export default Header
