import styles from './TopBar.module.css'
import Select from '../global/Form/Select'
import { FC } from 'react'

interface Props {
  screen: string
}

const widths = [
  '100%',
  '90%',
  '80%',
  '70%',
  '60%',
  '50%',
  '40%',
  '30%',
  '20%',
  '10%',
]

const columnsNumber = ['1', '2', '3', '4', '5', '6', '7']

const ScreenPreference: FC<Props> = ({ screen }) => {
  return (
    <div className={styles['settings-container']} key={screen}>
      <h3>{screen}</h3>
      <Select label='Ancho' data={widths} />
      <Select label='Columnas' data={columnsNumber} />
    </div>
  )
}

export default ScreenPreference
