import { useState } from 'react'

import './App.css'
import Home from './Components/Home'
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <div className="py-10 px-5 h-screen bg-gray-800">
    <Home/>
    <ToastContainer/>
    </div>
  )
}

export default App
