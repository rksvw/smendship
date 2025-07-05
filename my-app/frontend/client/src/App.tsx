import './App.css'
import LoginComponent from './components/Auth/LoginComponent'
import {Route, Routes} from "react-router-dom"
import SignupComponent from './components/Auth/SignupComponent'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path='login' element={<LoginComponent />} />
          <Route path='signup' element={<SignupComponent />} />
        </Routes>
        </div>
    </>
  )
}

export default App
