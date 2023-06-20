import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './utils/theme.ts'
import { FirebaseProvider } from './context/Firebase.tsx'
import './index.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} >
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
