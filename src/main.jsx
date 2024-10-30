
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import ContextProvider from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    
    <App />
  </ContextProvider>,
)
