import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App.jsx'
import { ConfirmContextProvider } from './components/confirm/ConfirmContex'

import './index.css'


const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
      
      
  <ConfirmContextProvider>
    <QueryClientProvider client={queryClient}>
       <App />
    </QueryClientProvider>
  </ConfirmContextProvider>
  </React.StrictMode>,
)
