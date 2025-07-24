import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { useAuth } from './Context/UserContext/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <useAuth>
        <App />
    </useAuth>
  </React.StrictMode>,
)
