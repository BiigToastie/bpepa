import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { InstallAppProvider } from './context/InstallAppContext'
import './index.css'

registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <InstallAppProvider>
        <App />
      </InstallAppProvider>
    </AuthProvider>
  </StrictMode>,
)
