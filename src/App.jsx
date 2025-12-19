
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './user/Home'
import Auth from './pages/Auth'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth registerURL = {true}/>}/>

    </Routes>
    </>
  )
}

export default App
