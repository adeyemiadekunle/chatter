import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './utils/theme.ts'
import { FirebaseProvider } from './context/index.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} >
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
