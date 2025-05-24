// eslint-disable-next-line no-unused-vars
import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store.js'
import {Provider} from 'react-redux';
import  Toaster  from "@/components/ui/toaster"
import axios from 'axios';
import { SearchProvider } from '@/context/SearchContext.jsx';

// Configure axios to include credentials (cookies) in every request
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* Router setup */}
  <StrictMode>
    <Provider store={store}> {/* Redux setup */}
      <SearchProvider> {/* Add SearchProvider here */}
        <App />
        <Toaster />
      </SearchProvider>
    </Provider>
  </StrictMode>
</BrowserRouter>
)