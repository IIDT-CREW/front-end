import { CardTheme } from '../components/Common/Card/types'
import { NavThemeType } from '../components/Menu/theme'
import { ModalTheme } from '../components/Common/Modal/types'
import { Breakpoints, Colors, MediaQueries, Radii, Shadows, Spacing, ZIndices } from './types'

export interface IIDTUiKitTheme {
  siteWidth: number
  isDark: boolean
  colors: Colors
  card: CardTheme
  nav: NavThemeType
  modal: ModalTheme
  breakpoints: Breakpoints
  mediaQueries: MediaQueries
  spacing: Spacing
  shadows: Shadows
  radii: Radii
  zIndices: ZIndices
}

export { darkColors, lightColors } from './colors'
export { default as dark } from './dark'
export { default as light } from './light'
export * from './types'
