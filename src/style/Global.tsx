import { createGlobalStyle } from 'styled-components'
import { IIDTUiKitTheme } from 'theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends IIDTUiKitTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Nanum Myeongjo','Spoqa Han Sans Neo', 'sans-serif'; 
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
