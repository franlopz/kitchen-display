import Footer from '@/components/Footer/Footer'
import TopBar from '@/components/TopBar/TopBar'
import styles from './Main.module.css'
import OrderDisplay from '@/components/main/OrderDisplay/OrderDisplay'

const Main = () => {
  return (
    <div className={styles.container}>
      <TopBar />
      <OrderDisplay />
      <Footer />
    </div>
  )
}

export default Main
