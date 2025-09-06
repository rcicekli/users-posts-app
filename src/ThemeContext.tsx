import { createContext, useContext, useState, useMemo } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import getTheme from './theme'
import type { ReactNode } from 'react'


type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeContext must be inside a Provider')
  return context
}

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('app-theme')
    return (saved as ThemeMode) || 'dark'
  })

  const toggleTheme = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('app-theme', next)
      return next
    })
  }

  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
