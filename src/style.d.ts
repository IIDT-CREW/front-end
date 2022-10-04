import { createGlobalStyle } from 'styled-components'
import { IIDTUiKitTheme } from 'theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends IIDTUiKitTheme {}
}
