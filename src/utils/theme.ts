// theme.ts

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
// const config: ThemeConfig = {
//   initialColorMode: 'light',
//   useSystemColorMode: false,
// }


// 3. extend the theme
const theme = extendTheme({ 
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
    },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "black" : "#FFFFFF",
        color: props.colorMode === "dark" ? "#F5F5F5" : "gray.800", 
      },
      ".selected-div": {
        border: "1px solid",
        borderColor: props.colorMode === "dark" ? "#1E293B" : "#E2E8F0",
      },
      ".header": {
        borderBottom: "1px solid",
        borderColor: props.colorMode === "dark" ? "#1E293B" : "#E2E8F0",
      },
    
    }),
  },
  colors : {}

  


 })

export default theme