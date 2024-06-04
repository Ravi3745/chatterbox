import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import ChatContextProvider from './context/ChatContextProvider.jsx'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <ChatContextProvider>
    
      
      <App/>
    <ToastContainer />
    
    </ChatContextProvider>
  </BrowserRouter>  
    
  
)
