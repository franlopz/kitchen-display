import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import OnBoarding from './pages/OnBoarding/OnBoarding'
import { Toaster } from 'react-hot-toast'
import { StepsProvider } from './context/StepsContext'
import PinScreen from './pages/PinScreen/PinScreen'
import Main from './pages/Main/Main'

function App() {
  return (
    <>
      <StepsProvider>
        <Toaster />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/setup' element={<OnBoarding />} />
          <Route path='/pin' element={<PinScreen />} />
        </Routes>
      </StepsProvider>
    </>
  )
}

export default App
