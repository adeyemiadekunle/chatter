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
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "black" : "#F5F5F5",
        color: props.colorMode === "dark" ? "#F5F5F5" : "gray.800",
      },
    }),
  },

  colors: {
    primary: {
      100: 'blue/100',
      200: 'blue/200',
      300: 'blue/300',
      400: 'blue/400',
      500: 'blue/500',
      600: 'blue/600',
      700: 'blue/700',
      800: 'blue/800',
      900: 'blue/900',
    },
    secondary: {
      100: 'orange/100',
      200: 'orange/200',
      300: 'orange/300',
      400: 'orange/400',
      500: 'orange/500',
      600: 'orange/600',
      700: 'orange/700',
      800: 'orange/800',
      900: 'orange/900',                  
    }
},


 })

export default theme