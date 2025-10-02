"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Récupérer le thème depuis localStorage ou utiliser light par défaut
    const savedTheme = localStorage.getItem('bizuri-admin-theme') as Theme
    const initialTheme = savedTheme || 'light'
    
    setTheme(initialTheme)
    setIsInitialized(true)
    
    // Appliquer la classe au document
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(initialTheme)
  }, [])

  useEffect(() => {
    if (!isInitialized) return
    
    // Sauvegarder dans localStorage
    localStorage.setItem('bizuri-admin-theme', theme)
    
    // Appliquer la classe au document
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }, [theme, isInitialized])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  if (!isInitialized) {
    // Éviter le flash pendant l'initialisation
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
