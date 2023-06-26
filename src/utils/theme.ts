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

   

    fontSizes: {
      sm: `var(--font-size-sm)`,
      base: `var(--font-size-base)`,
      md: `var(--font-size-md)`,
      lg: `var(--font-size-lg)`,
      xl: `var(--font-size-xl)`,
      "2xl": `var(--font-size-xxl)`,
      "3xl": `var(--font-size-xxxl)`,
    },
    
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    'xl': '2.5',
    '2xl': '3',
    '3xl': '3.5',
    '4xl': '4',
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  colors : {
    primary: {
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        900 : "#1E293B",
        800 : "#3E4C59",
        700 : "#52606D",
        600 : "#616E7C",
        500 : "#7B8794",
        400 : "#9AA5B1",
        300 : "#CBD2D9",
        200 : "#E4E7EB",
        100 : "#F5F7FA",
        50 : "#FAFBFC",
      },
    },
    brand: {
    900 : "#0047AB",
    800 : "#0057C2",
    700 : "#0067D9",
    600 : "#0077F0",
    500 : "#0087FF",
    400 : "#3399FF",
    300 : "#66AAFF",
    200 : "#99BBFF",
    100 : "#CCECFF",
    50 : "#E6F5FF",
  },
  },
    
  styles: {
    global: (props: any) => ({
     a:{
        fontSize: 'base',
      },
      p: {
        fontSize: 'base',
      },
     
      body: {
        bg: props.colorMode === "dark" ? "black" : "#F5f5f5",
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

 })

export default theme