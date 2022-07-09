import useOrders from '@/hooks/useOrders'
import { Order } from '@/interfaces/Order'
import React, { FC, useEffect, useState } from 'react'
import Header from './Header'
import styles from './OrderCard.module.css'

interface Props {
  order: Order
  screen: string
}

const OrderCard: FC<Props> = ({ order, screen }) => {
  const { type, number, waiter, table, date, items } = order
  const { ordersGroup, getStatus } = useOrders({
    items,
    date,
  })
  const [buttonCaption, setButtonCaption] = useState<string>('Listo')
  const [buttonInLineStyle, setButtonInLineStyle] = useState<
    React.CSSProperties | undefined
  >(undefined)

  const clickHandler = () => {
    setButtonCaption('Confirmar')
    setButtonInLineStyle({ backgroundColor: '#2f80ed' })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setButtonCaption('Listo')
      setButtonInLineStyle(undefined)
    }, 3500)

    return () => clearInterval(interval)
  }, [buttonCaption])

  // if (loading) return null
  return (
    <div className={styles.container}>
      <Header
        screen={screen}
        number={number}
        type={type}
        waiter={waiter}
        table={table}
        date={date}
      />
      <div className={styles.orders}>
        {ordersGroup.map(([categorie, items]) => (
          <div key={categorie} className={styles['order-group']}>
            <p className={styles['categorie-name']}>{categorie}</p>
            {items.map((item) => (
              <div key={item.uid} className={styles['order-container']}>
                <div className={styles['order-item']}>
                  <p>{item.qty}</p>
                  <p>{item.name}</p>
                </div>
                <p className={styles.portion}>{item.portion}</p>
                <div className={styles['tag-container']}>
                  {item.tags.map((tag) => (
                    <p key={tag.name} className={styles.tag}>{`${
                      tag.qty !== 1 ? tag.qty + ' x' : ''
                    } ${tag.name}`}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className={`${styles.button} ${getStatus(screen)}`}
        style={buttonInLineStyle}
        onClick={clickHandler}
      >
        {buttonCaption}
      </button>
    </div>
  )
}

export default OrderCard
