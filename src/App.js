import React from 'react'
import './App.css'
import Usage from './components/ToggleCompoundComponents'

function App() {
  return (
    <div
      style={{
        height: '100vh',
        flex: 1,
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Usage />
    </div>
  )
}

export default App
