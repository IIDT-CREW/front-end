import { useContext } from 'react'
import { ThemeContext as StyledThemeContext } from 'styled-components'
import { useTheme as useNextTheme } from 'next-themes'
export const THEME_TYPE = {
  DARK: 'dark',
  LIGHT: 'light',
}

const useTheme = () => {
  const { resolvedTheme, setTheme } = useNextTheme()
  const theme = useContext(StyledThemeContext)
  return { isDark: resolvedTheme === 'dark', theme, setTheme }
}

export default useTheme
