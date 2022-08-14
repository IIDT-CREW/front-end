import { DefaultTheme } from 'styled-components'
import { light as lightAlert } from '../components/Common/Alert/theme'
import { light as lightCard } from '../components/Common/Card/theme'
// import { light as lightPancakeToggle } from 'components/PancakeToggle/theme'
// import { light as lightRadio } from 'components/Radio/theme'
// import { light as lightToggle } from 'components/Toggle/theme'
// import { light as lightTooltip } from 'components/Tooltip/theme'
import { light as lightNav } from '../components/Menu/theme'
import { light as lightModal } from '../components/Common/Modal/theme'

import base from './base'
import { lightColors } from './colors'

const lightTheme: DefaultTheme = {
  ...base,
  isDark: false,
  alert: lightAlert,
  colors: lightColors,
  card: lightCard,
  // toggle: lightToggle,
  nav: lightNav,
  modal: lightModal,
  // pancakeToggle: lightPancakeToggle,
  // radio: lightRadio,s
  // tooltip: lightTooltip,
}

export default lightTheme
