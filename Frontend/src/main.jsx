import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/* // enabales React Router throughout application */}
    <BrowserRouter> 
    {/* AuthContext is available throughout your entire application. */}
      <AuthProvider>
         <App/>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
