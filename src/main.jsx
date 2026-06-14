import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/source-sans-3/index.css'
import 'overlayscrollbars/styles/overlayscrollbars.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'admin-lte/dist/css/adminlte.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'admin-lte/dist/js/adminlte.min.js'
import { initAdminLteTheme } from './lib/adminlte'
import './index.css'
import App from './App.jsx'

initAdminLteTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
