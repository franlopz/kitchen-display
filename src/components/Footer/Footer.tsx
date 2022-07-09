import { MdRiceBowl } from 'react-icons/md'
import styles from './Footer.module.css'
const icons = [1, 2, 3, 4, 5, 6]
const Footer = () => {
  return (
    <div className={styles.container}>
      {icons.map((icon) => (
        <button key={icon} className={styles['button-icon']}>
          <MdRiceBowl className={styles.icon} />
          <p>{icon}</p>
        </button>
      ))}
    </div>
  )
}

export default Footer
