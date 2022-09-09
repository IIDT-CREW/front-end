import { DefaultTheme } from 'styled-components'
import { dark as darkCard } from '../components/Common/Card/theme'
import { dark as darkNav } from '../components/Menu/theme'
import { dark as darkModal } from '../components/Common/Modal/theme'
import base from './base'
import { darkColors } from './colors'

const darkTheme: DefaultTheme = {
  ...base,
  isDark: true,
  colors: darkColors,
  card: darkCard,
  nav: darkNav,
  modal: darkModal,
}

export default darkTheme
