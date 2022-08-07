import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import OnBoarding from './pages/OnBoarding/OnBoarding'
import { Toaster } from 'react-hot-toast'
import { StepsProvider } from './context/StepsContext'
import PinScreen from './pages/PinScreen/PinScreen'
import Main from './pages/Main/Main'
import SignUp from './pages/SignUp/SignUp'
import AuthRoute from './lib/AuthRoute'
import Logout from './lib/Logout'
import { SocketContextProvider } from './context/socket'

function App() {
  return (
    <>
      <SocketContextProvider>
        <StepsProvider>
          <Toaster />
          <Routes>
            <Route
              path='/'
              element={
                <AuthRoute redirect='/login'>
                  <Main />
                </AuthRoute>
              }
            />
            <Route
              path='/login'
              element={
                <AuthRoute redirect='/'>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path='/setup'
              element={
                <AuthRoute redirect='/login'>
                  <OnBoarding />
                </AuthRoute>
              }
            />
            <Route
              path='/signup'
              element={
                <AuthRoute redirect='/login'>
                  <SignUp />
                </AuthRoute>
              }
            />
            <Route
              path='/pin'
              element={
                <AuthRoute redirect='/login'>
                  <PinScreen />
                </AuthRoute>
              }
            />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </StepsProvider>
      </SocketContextProvider>
    </>
  )
}

export default App
