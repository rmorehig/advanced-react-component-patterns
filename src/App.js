import React from 'react'
import './App.css'
import Usage from './components/Toggle-05'

function App() {
  return (
    <div
      style={{
        height: '100vh',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Usage />
    </div>
  )
}

export default App
