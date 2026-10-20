import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Bootstrap y Font Awesome, igual que el sitio original (menú, carrusel, íconos)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './styles/estilos.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
