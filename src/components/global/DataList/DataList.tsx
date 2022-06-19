import { FC } from 'react'
import styles from './DataList.module.css'

export interface DataListProps {
  label: string[] | null
  buttons?: Array<(value: string) => JSX.Element>
}
const DataList: FC<DataListProps> = ({ label, buttons }) => {
  return (
    <ul className={styles['unordered-list']}>
      {label?.map((item) => (
        <li key={item} className={styles['list-item']}>
          <p>{item}</p>
          <div>{buttons && buttons?.map((fn) => fn(item))}</div>
        </li>
      ))}
    </ul>
  )
}

export default DataList
