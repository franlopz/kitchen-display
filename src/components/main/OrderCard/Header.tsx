import useOrders from '@/hooks/useOrders'
import { FC } from 'react'
import styles from './OrderCard.module.css'

interface Props {
  number: number
  type: string
  seller: string
  table: string
  createdAt: string
  screen: string
  isVoided: boolean
}

const Header: FC<Props> = ({
  number,
  type,
  seller,
  table,
  createdAt,
  screen,
  isVoided,
}) => {
  const { getStatus, elapsedTime } = useOrders({ createdAt })
  return (
    <div className={`${styles.header} ${getStatus(screen)}`}>
      <div className={styles['header-row']}>
        <p className={styles.number}>#{number}</p>
        <p className={styles.type}>{type}</p>
        <p>{seller}</p>
      </div>
      <div className={styles['header-row']}>
        <p>{table}</p>
        <h2>{isVoided ? 'ANULADO' : ''}</h2>
        <p>{elapsedTime}</p>
      </div>
    </div>
  )
}

export default Header
