import { light, dark } from 'theme'
import ModalProvider from 'components/Common/Modal/ModalContext'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { ToastContextProvider } from './contexts/Toast'
import { Store } from '@reduxjs/toolkit'
import { useDarkMode } from 'hooks/useDarkMode'

const Providers: React.FC<{ children: any; store: Store }> = ({ children, store }) => {
  const [themeMode, toggleTheme] = useDarkMode()
  const theme = themeMode === 'light' ? light : dark
  console.log('themeMode = ', themeMode)
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContextProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastContextProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default Providers
