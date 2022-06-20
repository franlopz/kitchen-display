import PinInput from '@/components/pinScreen/PinInput'
import styles from './PinScreen.module.css'

const PinScreen = () => {
  return (
    <div className={styles.container}>
      <h2>¡Hola!</h2>
      <h3>Ingresa tu PIN para ingresar</h3>
      <PinInput />
    </div>
  )
}

export default PinScreen
