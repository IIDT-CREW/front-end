import React from 'react'
// import { addDecorator } from '@storybook/react'
// import { ThemeProvider } from 'styled-components'
import { withThemesProvider } from 'themeprovider-storybook'

//import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import light from '../src/theme/light'
import dark from '../src/theme/dark'
import ResetCSS from '../src/style/ResetCSS'
import ModalProvider from '../src/components/Common/Modal/ModalContext'

export const globalDecorator = (Story) => (
  // <ModalProvider>
  <ModalProvider>
    <ResetCSS />
    <Story />
  </ModalProvider>
  // </ModalProvider>
)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const themes = [
  {
    name: 'Light',
    backgroundColor: light.colors.background,
    ...light,
  },
  {
    name: 'Dark',
    backgroundColor: dark.colors.background,
    ...dark,
  },
]

//addDecorator(withThemesProvider(themes), ThemeProvider)

export const decorators = [globalDecorator, withThemesProvider(themes)]
