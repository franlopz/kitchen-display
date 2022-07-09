import React from 'react'
import styles from './Form.module.css'

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { data: string[] | null | number[]; label: string }

const Select = ({
  value = '',
  data,
  label = '',
  ...props
}: Omit<Props, 'className'>): JSX.Element => {
  return (
    <div className={styles['select-container']}>
      <label className={styles['select-label']}>{label}</label>
      <select value={value} className={styles.select} {...props}>
        <option value='' disabled>
          Elige una opción
        </option>
        {data?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
