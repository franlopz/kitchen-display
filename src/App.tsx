import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import OnBoarding from './pages/OnBoarding/OnBoarding'
import { Toaster } from 'react-hot-toast'
import { StepsProvider } from './context/StepsContext'
import PinScreen from './pages/PinScreen/PinScreen'
import Main from './pages/Main/Main'
import SignUp from './pages/SignUp/SignUp'
import AuthRoute from './components/protectRoute/AuthRoute'
import { SocketContextProvider } from './context/socket'
import ChangeUser from './pages/ChangeUser/ChangeUser'
import Settings from './pages/Settings/Settings'
import HomeLayout from './components/protectRoute/HomeLayout'
import Logout from './components/protectRoute/Logout'
import SetupLayout from './components/protectRoute/SetupLayout'
import PinLayout from './components/protectRoute/PinLayout'

function App() {
  return (
    <>
      <SocketContextProvider>
        <StepsProvider>
          <Toaster />
          <Routes>
            <Route element={<AuthRoute redirect='/login' />}>
              <Route element={<SetupLayout />}>
                <Route path='/pin' element={<PinScreen />} />
                <Route element={<PinLayout />}>
                  <Route path='/setup' element={<OnBoarding />} /> {/* Si  */}
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/changeuser' element={<ChangeUser />} />
                  <Route path='/' element={<Main />} />
                </Route>
              </Route>
            </Route>
            <Route element={<HomeLayout redirect='/pin' />}>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
            </Route>
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </StepsProvider>
      </SocketContextProvider>
    </>
  )
}

export default App
