'use client'

import { useState, useEffect } from 'react'
import { FlattenedTranslation } from '@/types/translations'
import { useToast } from '@/components/ui/toast'
import { validateTranslations, ValidationError } from '@/lib/validation'
import { ValidationPanel } from '@/components/ValidationPanel'
import { MainContent } from '@/components/dashboard/MainContent'
import { 
  RefreshCw, Save, Globe, Type, MessageSquare, Users, DollarSign, 
  HelpCircle, Mail, Navigation, Zap, ChevronsRight, ChevronDown,
  Settings, User, Layout, Menu, X, Search
} from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function Dashboard() {
  const [translations, setTranslations] = useState<FlattenedTranslation[]>([])
  const [originalTranslations, setOriginalTranslations] = useState<FlattenedTranslation[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('metadata')
  const [globalSearchTerm, setGlobalSearchTerm] = useState('')

  const [isDirty, setIsDirty] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [showValidation, setShowValidation] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [validationWarnings, setValidationWarnings] = useState<ValidationError[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { addToast } = useToast()

  // Close mobile menu when clicking on category items
  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey)
    setMobileMenuOpen(false) // Close mobile menu
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Global search filtering
  const isGlobalSearchActive = globalSearchTerm.trim() !== ''
  const globalSearchResults = isGlobalSearchActive 
    ? translations.filter(translation => {
        const searchTerm = globalSearchTerm.toLowerCase().trim()
        return (
          translation.key.toLowerCase().includes(searchTerm) ||
          translation.fr.toLowerCase().includes(searchTerm) ||
          translation.en.toLowerCase().includes(searchTerm) ||
          translation.key.split('.').pop()?.toLowerCase().includes(searchTerm)
        )
      })
    : []

  // When global search is active, show all results; otherwise show filtered by category
  const displayTranslations = isGlobalSearchActive ? globalSearchResults : translations
  const displayCategory = isGlobalSearchActive ? 'search-results' : selectedCategory

  const categories = [
    { key: 'metadata', title: 'SEO & Meta', icon: Globe },
    { key: 'navigation', title: 'Header', icon: Navigation },
    { key: 'footer', title: 'Footer', icon: Layout },
    { key: 'hero', title: 'Hero', icon: Zap },
    { key: 'features', title: 'Features', icon: Type },
    { key: 'howItWorks', title: 'Process', icon: MessageSquare },
    { key: 'testimonials', title: 'Testimonials', icon: Users },
    { key: 'pricing', title: 'Pricing', icon: DollarSign },
    { key: 'faq', title: 'FAQ', icon: HelpCircle },
    { key: 'contact', title: 'Contact', icon: Mail }
  ]

  const loadTranslations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/translations')
      const data = await response.json()
      
      if (data.success) {
        setTranslations(data.translations)
        setOriginalTranslations(data.translations)
        setIsDirty(false)
        if (!isInitialLoad) {
          addToast('success', 'Traductions rechargées avec succès')
        }
      } else {
        console.error('Failed to load translations:', data.error)
        addToast('error', 'Erreur lors du chargement des traductions')
      }
    } catch (error) {
      console.error('Error loading translations:', error)
      addToast('error', 'Erreur de connexion')
    } finally {
      setLoading(false)
      setIsInitialLoad(false)
    }
  }

  const saveTranslations = async () => {
    try {
      setSaving(true)
      
      // Validate before saving
      const validation = validateTranslations(translations)
      
      if (!validation.isValid) {
        setValidationErrors(validation.errors)
        setValidationWarnings(validation.warnings)
        setShowValidation(true)
        addToast('error', `${validation.errors.length} erreur(s) trouvée(s). Veuillez les corriger avant de sauvegarder.`)
        return Promise.reject('Validation failed')
      }

      if (validation.warnings.length > 0) {
        setValidationWarnings(validation.warnings)
        addToast('warning', `${validation.warnings.length} avertissement(s) détecté(s).`)
      }

      const response = await fetch('/api/translations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ translations }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setOriginalTranslations(translations)
        setIsDirty(false)
        addToast('success', 'Traductions sauvegardées avec succès !')
        return Promise.resolve()
      } else {
        console.error('Failed to save translations:', data.error)
        addToast('error', 'Erreur lors de la sauvegarde')
        throw new Error('Failed to save translations')
      }
    } catch (error) {
      console.error('Error saving translations:', error)
      if (error !== 'Validation failed') {
        addToast('error', 'Erreur de connexion lors de la sauvegarde')
      }
      throw error
    } finally {
      setSaving(false)
    }
  }

  const updateTranslation = (key: string, field: 'fr' | 'en', value: string) => {
    setTranslations(prev => {
      const updated = prev.map(translation => 
        translation.key === key 
          ? { ...translation, [field]: value }
          : translation
      )
      
      // Check if translations have changed
      const hasChanged = JSON.stringify(updated) !== JSON.stringify(originalTranslations)
      setIsDirty(hasChanged)
      
      return updated
    })
  }

  const handleNavigateToField = (key: string) => {
    // Find the category of the key and switch to it
    const translation = translations.find(t => t.key === key)
    if (translation) {
      setSelectedCategory(translation.category)
      setShowValidation(false)
      
      // Scroll to element after a brief delay to allow UI to update
      setTimeout(() => {
        const element = document.querySelector(`[data-key="${key}"]`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }

  useEffect(() => {
    const initialLoad = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/translations')
        const data = await response.json()
        
        if (data.success) {
          setTranslations(data.translations)
          setOriginalTranslations(data.translations)
          setIsDirty(false)
        } else {
          console.error('Failed to load translations:', data.error)
          addToast('error', 'Erreur lors du chargement des traductions')
        }
      } catch (error) {
        console.error('Error loading translations:', error)
        addToast('error', 'Erreur de connexion')
      } finally {
        setLoading(false)
        setIsInitialLoad(false)
      }
    }
    
    initialLoad()
  }, [addToast])

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) { // xl breakpoint pour correspondre aux classes Tailwind
        setSidebarOpen(false)
        setMobileMenuOpen(false)
      } else {
        setSidebarOpen(true)
        setMobileMenuOpen(false)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const currentCategory = categories.find(c => c.key === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-bizuri-yellow" />
          <p className="text-lg font-medium text-bizuri-black">Chargement des traductions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full bg-background relative overflow-x-hidden main-container">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 mobile-menu-overlay xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Modern Sidebar */}
      <nav
        className={`
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
          fixed xl:sticky top-0 h-screen z-50 xl:z-auto
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64 xl:w-52 2xl:w-64' : 'w-64 xl:w-52 2xl:w-16'}
          border-r border-border/30
          sidebar-mobile-tablet xl:bg-card 
          shadow-xl xl:shadow-sm
        `}
      >
        <div className="h-full flex flex-col overflow-y-auto xl:overflow-hidden">
          {/* Title Section - Fixed */}
          <div className="flex-shrink-0 p-2 md:p-1.5 lg:p-2 bg-background/50 xl:bg-transparent backdrop-blur-sm xl:backdrop-blur-none rounded-lg xl:rounded-none">
            <div className="mb-4 lg:mb-6 border-b border-border/50 xl:border-border pb-3 lg:pb-4 bg-card/30 xl:bg-transparent rounded-lg xl:rounded-none p-2 lg:p-3 xl:p-0 logo-section">
              <div className="flex cursor-pointer items-center justify-between rounded-md p-1.5 lg:p-2 transition-colors hover:bg-muted/50 xl:hover:bg-muted">
                <div className="flex items-center gap-2 lg:gap-3">
                  {/* Logo */}
                  <div className="grid size-8 lg:size-10 shrink-0 place-content-center rounded-lg bg-bizuri-gradient shadow-sm">
                    <svg
                      width="16"
                      height="auto"
                      viewBox="0 0 50 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-bizuri-black lg:w-5 lg:h-auto"
                    >
                      <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
                      <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
                    </svg>
                  </div>
                  {(sidebarOpen || mobileMenuOpen) && (
                    <div className={`transition-opacity duration-200 ${sidebarOpen || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="block text-sm lg:text-sm font-semibold text-bizuri-black">
                            Bizuri
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            Landing Admin
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {(sidebarOpen || mobileMenuOpen) && (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                  {/* Mobile Close Button */}
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="lg:hidden p-2 hover:bg-muted rounded-md"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items - No scroll on desktop */}
          <div className="flex-1 p-1.5 lg:p-2 xl:p-0 xl:overflow-hidden">
            <div className="space-y-1 mb-6 lg:mb-8 bg-card/20 xl:bg-transparent rounded-lg p-1.5 lg:p-2 xl:p-0">
              {categories.map((category) => {
                const Icon = category.icon
                const isSelected = selectedCategory === category.key
                
                return (
                  <button
                    key={category.key}
                    onClick={() => handleCategorySelect(category.key)}
                    className={`relative flex h-9 lg:h-11 w-full items-center rounded-md transition-all duration-200 px-1.5 lg:px-2 nav-item ${
                      isSelected 
                        ? "bg-bizuri-yellow/10 text-bizuri-yellow-dark shadow-sm border-l-2 border-bizuri-yellow" 
                        : "text-muted-foreground hover:bg-muted/50 xl:hover:bg-muted hover:text-bizuri-black"
                    }`}
                  >
                    <div className="grid h-full w-10 lg:w-12 place-content-center">
                      <Icon className="h-3.5 lg:h-4 w-3.5 lg:w-4" />
                    </div>
                    
                    {(sidebarOpen || mobileMenuOpen) && (
                      <span
                        className={`text-sm font-medium transition-opacity duration-200 ${
                          sidebarOpen || mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {category.title}
                      </span>
                    )}

                    {/* Notification badge for unsaved changes */}
                    {isDirty && isSelected && (sidebarOpen || mobileMenuOpen) && (
                      <span className="absolute right-2 lg:right-3 flex h-1.5 lg:h-2 w-1.5 lg:w-2 items-center justify-center rounded-full bg-bizuri-yellow-dark"></span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Account Section - Fixed */}
          {(sidebarOpen || mobileMenuOpen) && (
            <div className="flex-shrink-0 border-t border-border/50 xl:border-border pt-3 lg:pt-4 space-y-1 bg-card/20 xl:bg-transparent rounded-lg p-2 lg:p-3 xl:p-0 mt-3 lg:mt-4 xl:mt-0">
              <div className="px-2 lg:px-3 py-1 lg:py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Account
              </div>
              <button className="relative flex h-9 lg:h-11 w-full items-center rounded-md transition-all duration-200 text-muted-foreground hover:bg-muted/50 xl:hover:bg-muted hover:text-bizuri-black px-1.5 lg:px-2">
                <div className="grid h-full w-10 lg:w-12 place-content-center">
                  <Settings className="h-3.5 lg:h-4 w-3.5 lg:w-4" />
                </div>
                <span className="text-xs lg:text-sm font-medium">Settings</span>
              </button>
            </div>
          )}

          {/* Toggle Button - Hidden on Mobile - Fixed */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex-shrink-0 border-t border-border/50 xl:border-border transition-colors hover:bg-muted/50 xl:hover:bg-muted hidden xl:block bg-card/30 xl:bg-transparent backdrop-blur-sm xl:backdrop-blur-none"
          >
            <div className="flex items-center p-3">
              <div className="grid size-10 place-content-center">
                <ChevronsRight
                  className={`h-4 w-4 transition-transform duration-300 text-muted-foreground ${
                    sidebarOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {sidebarOpen && (
                <span
                  className={`text-sm font-medium text-muted-foreground transition-opacity duration-200 ${
                    sidebarOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  Hide
                </span>
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-background md:ml-0 min-w-0 content-tablet">
        {/* Mobile Header with Menu Button */}
        <div className="xl:hidden bg-card border-b border-border px-3 sm:px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2 text-muted-foreground hover:text-bizuri-black transition-colors"
          >
            <Menu className="h-5 w-5" />
            <span className="text-sm font-medium">Menu</span>
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isDirty ? 'bg-bizuri-yellow-dark' : 'bg-green-400'}`}></div>
            <span className="text-xs text-muted-foreground">
              {isDirty ? 'Non sauvé' : 'Synchronisé'}
            </span>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="xl:hidden px-3 sm:px-4 py-3 border-b border-border bg-card">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Recherche globale..."
              value={globalSearchTerm}
              onChange={(e) => setGlobalSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
        <div className="p-3 sm:p-4 lg:p-6">
          {/* Modern Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8 gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-bizuri-black">
                {isGlobalSearchActive 
                  ? `Résultats de recherche : "${globalSearchTerm}"`
                  : (currentCategory?.title || 'Dashboard')
                }
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-muted-foreground text-sm lg:text-base">
                  {isGlobalSearchActive 
                    ? `${globalSearchResults.length} résultat(s) trouvé(s)`
                    : `${translations.filter((t: FlattenedTranslation) => selectedCategory === '' || selectedCategory === 'all' || t.category === selectedCategory).length} traduction(s)`
                  }
                  {isGlobalSearchActive && (
                    <span className="text-bizuri-yellow"> • Recherche globale</span>
                  )}
                </p>
                <span className="hidden lg:inline">•</span>
                <div className="hidden lg:flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isDirty ? 'bg-bizuri-yellow-dark' : 'bg-green-400'}`}></div>
                  <span className="text-muted-foreground text-sm">
                    {isDirty ? 'Modifications non sauvegardées' : 'Synchronisé'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Global Search Bar */}
              <div className="relative hidden xl:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Recherche globale..."
                  value={globalSearchTerm}
                  onChange={(e) => setGlobalSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <ThemeToggle />
              
              <button
                onClick={loadTranslations}
                className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted hover:text-bizuri-black transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              
              <button
                onClick={saveTranslations}
                disabled={saving || !isDirty}
                className={`flex items-center gap-2 px-3 lg:px-4 py-2 text-sm rounded-lg transition-colors ${
                  saving || !isDirty 
                    ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                    : 'bg-bizuri-yellow text-bizuri-black hover:bg-bizuri-yellow-dark shadow-sm font-bold'
                }`}
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
              </button>
              
              <button className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted hover:text-bizuri-black transition-colors">
                <User className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Component */}
        <MainContent 
          translations={displayTranslations}
          selectedCategory={displayCategory}
          onUpdateTranslation={updateTranslation}
          globalSearchActive={isGlobalSearchActive}
        />
        </div>
      </div>

      {/* Validation Panel */}
      {showValidation && (
        <ValidationPanel
          errors={validationErrors}
          warnings={validationWarnings}
          onNavigateToField={handleNavigateToField}
          onClose={() => setShowValidation(false)}
        />
      )}
    </div>
  )
}
