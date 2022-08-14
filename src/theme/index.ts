import { AlertTheme } from '../components/Common/Alert/types'
import { CardTheme } from '../components/Common/Card/types'
// import { RadioTheme } from 'components/Radio/types'
// import { ToggleTheme } from 'components/Toggle/theme'
// import { TooltipTheme } from 'components/Tooltip/types'
import { NavThemeType } from '../components/Menu/theme'
import { ModalTheme } from '../components/Common/Modal/types'
import { Breakpoints, Colors, MediaQueries, Radii, Shadows, Spacing, ZIndices } from './types'

export interface NFTUiKitTheme {
  siteWidth: number
  isDark: boolean
  alert: AlertTheme
  colors: Colors
  card: CardTheme
  nav: NavThemeType
  modal: ModalTheme
  // radio: RadioTheme
  // toggle: ToggleTheme
  // tooltip: TooltipTheme
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
