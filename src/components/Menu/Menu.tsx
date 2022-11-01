import { useAppDispatch, useAppSelector } from '@/redux/hooks/useRedux'
import { openDrawer } from '@/redux/slices/displaySlice'
import { Link, useLocation } from 'react-router-dom'
import styles from './Menu.module.css'
import MenuData from './MenuData'

const Menu = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { isDrawerOpened } = useAppSelector((state) => state.display)
  const pathName = useLocation().pathname
  const dispatch = useAppDispatch()

  if (isDrawerOpened === false) return null

  const onClickHandler = () => {
    dispatch(openDrawer())
  }

  return (
    <div className={styles.wrapper} onClick={onClickHandler}>
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
    </div>
  )
}

export default Menu
