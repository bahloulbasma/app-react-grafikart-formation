import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import {store,  persistor } from './redux/store'
import App from './App.jsx'
import { ConfirmContextProvider } from './components/confirm/ConfirmContex'

import './index.css'
import { PersistGate } from 'redux-persist/integration/react'


const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>  
  <PersistGate persistor={persistor} loading ={null}>
  <ConfirmContextProvider>
    <QueryClientProvider client={queryClient}>
       <App />
    </QueryClientProvider>
  </ConfirmContextProvider>
  </PersistGate>

  </Provider>
)
