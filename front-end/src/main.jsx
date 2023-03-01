import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { WorkoutsContextProvider } from './context/WorkoutContext'
import { AuthContextProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <WorkoutsContextProvider>
        <App />
    </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
