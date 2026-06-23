import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'  // ← faltaba esto
import Login from './components/Login'
import Inicio from './pages/Inicio'
import Admin from './pages/Admin'
import Registro from './components/Registro'

function App() {


  return (

    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  )
}

export default App