import { useAppSelector } from '@/redux/hooks/useRedux'
import { Link, useLocation } from 'react-router-dom'
import styles from './Menu.module.css'
import MenuData from './MenuData'

const Menu = () => {
  const { user } = useAppSelector((state) => state.auth)
  const pathName = useLocation().pathname
  return (
    <div className={styles.container}>
      <h3>{user?.userName}</h3>
      {MenuData.map((item) => (
        <div key={item.title}>
          <Link
            className={`${styles.link} ${
              pathName === item.path ? styles['on-path'] : ''
            }`}
            to={item.path}
          >
            {item.icon}
            {item.title}
          </Link>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Menu
