import { DefaultTheme } from 'styled-components'
import { light as lightCard } from '../components/Common/Card/theme'
import { light as lightNav } from '../components/Menu/theme'
import { light as lightModal } from '../components/Common/Modal/theme'

import base from './base'
import { lightColors } from './colors'

const lightTheme: DefaultTheme = {
  ...base,
  isDark: false,
  colors: lightColors,
  card: lightCard,
  nav: lightNav,
  modal: lightModal,
}

export default lightTheme
