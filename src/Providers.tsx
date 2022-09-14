import { light, dark } from 'theme'
import ModalProvider from 'components/Common/Modal/ModalContext'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { ToastContextProvider } from './contexts/Toast'
import { Store } from '@reduxjs/toolkit'
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes'

const StyledThemeProvider = (props) => {
  const { resolvedTheme } = useNextTheme()
  return <ThemeProvider theme={resolvedTheme === 'light' ? light : dark} {...props} />
}

const Providers: React.FC<{ children: any; store: Store }> = ({ children, store }) => {
  return (
    <Provider store={store}>
      <NextThemeProvider>
        <StyledThemeProvider>
          <ToastContextProvider>
            <ModalProvider>{children}</ModalProvider>
          </ToastContextProvider>
        </StyledThemeProvider>
      </NextThemeProvider>
    </Provider>
  )
}

export default Providers
