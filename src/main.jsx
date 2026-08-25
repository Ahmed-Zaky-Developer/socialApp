import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//@fortawesome/fontawesome-free ==> لو عايز انزل الفونت اسون ولازم بعدها اربطه ف ال ماين
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
