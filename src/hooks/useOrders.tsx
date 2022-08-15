import { useEffect, useState } from 'react'
import styles from '@/components/main/OrderCard/OrderCard.module.css'
import { useAppSelector } from '@/redux/hooks/useRedux'
import { defaultTime } from '@/constants/constants'
import { Item } from '@/interfaces/Order'

type GroupedOrders = [string, Item[]][]

interface Props {
  orders?: Item[]
  createdAt?: string
}
const useOrders = ({ orders, createdAt }: Props) => {
  const [ordersGroup, setOrdersGroup] = useState<GroupedOrders>([])
  const [elapsedTime, setElapsedTime] = useState<string>('00:00:00')
  const [loading, setLoading] = useState<boolean>(true)
  const groupBy = <T, K extends keyof any>(array: T[], key: (i: T) => K) => {
    return array.reduce((groups, item) => {
      ;(groups[key(item)] ||= []).push(item)
      return groups
    }, {} as Record<K, T[]>)
  }
  const { settings } = useAppSelector((state) => state.display)

  const getInitialTimeCounter = async (createdAt: string) => {
    const now = new Date()
    const nowInMilliseconds = new Date(now.toISOString())
    const orderDate = new Date(createdAt)
    const diff = nowInMilliseconds.getTime() - orderDate.getTime()
    const hoursWithDecimals = diff / 3600000
    let hours: string | number = Math.trunc(hoursWithDecimals)
    const minutesWithDecimals = (hoursWithDecimals - hours) * 60
    let minutes: string | number = Math.trunc(minutesWithDecimals)
    const secondsWithDecimals = (minutesWithDecimals - minutes) * 60
    let seconds: string | number = Math.trunc(secondsWithDecimals)

    if (hours < 10) {
      hours = `0${hours}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    setElapsedTime(`${hours}:${minutes}:${seconds}`)
  }

  const getStatus = (screen: string) => {
    const defaultTime1 = settings[screen]?.time1 ?? defaultTime.time1
    const defaultTime2 = settings[screen]?.time2 ?? defaultTime.time2

    const time = elapsedTime.split(':')
    const [hours, minutes, seconds] = time
    const minutesElapsed =
      Number(hours) * 60 + Number(minutes) + Number(seconds) / 60
    if (minutesElapsed > defaultTime2) return styles.warning
    if (minutesElapsed > defaultTime1) return styles.caution
    return styles.new
  }

  useEffect(() => {
    if (orders) {
      const groupedOrders = groupBy(orders, (i) => i.categorie)
      setOrdersGroup(Object.entries(groupedOrders))
    }
  }, [orders])

  useEffect(() => {
    if (createdAt) {
      const interval = setInterval(() => {
        getInitialTimeCounter(createdAt).then(() => {
          setLoading(false)
        })
      })
      return () => {
        clearInterval(interval)
      }
    }
  }, [createdAt])

  return { ordersGroup, getInitialTimeCounter, getStatus, elapsedTime, loading }
}

export default useOrders
