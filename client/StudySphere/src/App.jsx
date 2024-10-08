import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
