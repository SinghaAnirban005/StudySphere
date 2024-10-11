import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='h-[100%] w-[100%]'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
