"use client"

import { useState, useMemo } from 'react'
import { FlattenedTranslation } from '@/types/translations'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Search, Languages, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MainContentProps {
  translations: FlattenedTranslation[]
  selectedCategory: string
  onUpdateTranslation: (key: string, field: 'fr' | 'en', value: string) => void
  globalSearchActive?: boolean
}

export function MainContent({ translations, selectedCategory, onUpdateTranslation, globalSearchActive = false }: MainContentProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Memoize search term normalization for better performance
  const normalizedSearchTerm = useMemo(() => 
    searchTerm.toLowerCase().trim(), 
    [searchTerm]
  )

  const filteredTranslations = useMemo(() => {
    if (!translations || translations.length === 0) return []
    
    return translations.filter(translation => {
      // For global search, translations are already filtered in dashboard
      if (globalSearchActive) return true
      
      // Category filter
      const matchesCategory = selectedCategory === '' || selectedCategory === 'all' || translation.category === selectedCategory
      
      // Search filter - only apply if there's a search term
      if (normalizedSearchTerm === '') {
        return matchesCategory
      }
      
      // Enhanced search that looks in all text fields
      const matchesSearch = 
        translation.key.toLowerCase().includes(normalizedSearchTerm) ||
        translation.fr.toLowerCase().includes(normalizedSearchTerm) ||
        translation.en.toLowerCase().includes(normalizedSearchTerm) ||
        // Also search in the visible display of the key (without dots)
        translation.key.split('.').pop()?.toLowerCase().includes(normalizedSearchTerm)
      
      return matchesCategory && matchesSearch
    })
  }, [translations, selectedCategory, normalizedSearchTerm, globalSearchActive])

  // Memoize grouped translations for global search or 'all' view
  const groupedTranslations = useMemo(() => {
    if (selectedCategory !== 'all' && selectedCategory !== 'search-results') return null
    
    return filteredTranslations.reduce((acc, translation) => {
      const category = translation.category
      if (!acc[category]) acc[category] = []
      acc[category].push(translation)
      return acc
    }, {} as Record<string, FlattenedTranslation[]>)
  }, [filteredTranslations, selectedCategory])

  const getSectionTitle = (category: string) => {
    const titles: { [key: string]: string } = {
      'metadata': 'Métadonnées SEO',
      'navigation': 'Header',
      'hero': 'Section Hero',
      'features': 'Fonctionnalités',
      'howItWorks': 'Comment ça marche',
      'testimonials': 'Témoignages',
      'pricing': 'Tarification',
      'faq': 'Questions fréquentes',
      'contact': 'Contact',
      'partners': 'Partenaires',
      'footer': 'Footer',
      'all': 'Toutes les sections',
      'search-results': 'Résultats de recherche'
    }
    return titles[category] || category
  }

  const getSectionDescription = (category: string) => {
    const descriptions: { [key: string]: string } = {
      'metadata': 'Titre et description de la page pour le référencement',
      'navigation': 'Textes du header et liens de navigation',
      'hero': 'Bannière principale et appel à l\'action',
      'features': 'Avantages et caractéristiques du produit',
      'howItWorks': 'Étapes et processus d\'utilisation',
      'testimonials': 'Avis et retours de clients',
      'pricing': 'Plans, prix et descriptions des offres',
      'faq': 'Questions fréquemment posées',
      'contact': 'Informations et formulaire de contact',
      'partners': 'Logos et informations des partenaires',
      'footer': 'Liens et informations du pied de page',
      'all': 'Toutes les traductions disponibles',
      'search-results': 'Résultats de votre recherche globale'
    }
    return descriptions[category] || 'Traductions pour cette section'
  }

  // Show section selector when no category is selected
  if (!selectedCategory) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <Languages className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-bizuri-black mb-2">
            Sélectionnez une section
          </h3>
          <p className="text-muted-foreground">
            Choisissez une section dans le menu de gauche pour commencer l&apos;édition.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Section Header */}
      <div className="border-b border-border bg-muted/30 px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center gap-3">
          <Languages className="h-4 w-4 lg:h-5 lg:w-5 text-bizuri-yellow flex-shrink-0" />
          <div className="min-w-0">
            <h2 className="text-lg lg:text-xl font-semibold text-bizuri-black truncate">{getSectionTitle(selectedCategory)}</h2>
            <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">{getSectionDescription(selectedCategory)}</p>
          </div>
        </div>
      </div>

      {/* Search Bar - Only show for local search, not global search */}
      {!globalSearchActive && filteredTranslations.length > 0 && (
        <div className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4 border-b border-border bg-card">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par clé ou contenu (FR/EN)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border focus:border-primary focus:ring-primary text-sm"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6 bg-background">
        {filteredTranslations.length === 0 ? (
          <div className="text-center py-8 lg:py-12 px-4">
            <Search className="mx-auto h-10 w-10 lg:h-12 lg:w-12 text-muted-foreground mb-4" />
            <h3 className="text-base lg:text-lg font-medium text-bizuri-black mb-2">
              {globalSearchActive ? 'Aucun résultat trouvé' : 'Aucune traduction trouvée'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {globalSearchActive 
                ? 'Essayez avec des mots-clés différents'
                : (searchTerm ? 'Modifiez votre recherche ou' : '') + ' Sélectionnez une autre section.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-base lg:text-lg font-semibold text-bizuri-black flex items-center gap-2">
                <FileText className="h-4 w-4 lg:h-5 lg:w-5 text-bizuri-yellow flex-shrink-0" />
                <span className="truncate">
                {globalSearchActive || selectedCategory === 'all' || selectedCategory === 'search-results' 
                  ? `${filteredTranslations.length} résultat(s)`
                  : `${filteredTranslations.length} traduction(s)`
                }
                </span>
              </h3>
            </div>

            {/* Show grouped results for global search or 'all' view */}
            {(selectedCategory === 'all' || selectedCategory === 'search-results') && groupedTranslations ? (
              <div className="space-y-6 lg:space-y-8">
                {Object.entries(groupedTranslations).map(([category, categoryTranslations]) => (
                  <div key={category} className="space-y-3 lg:space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-border">
                      <h4 className="text-sm lg:text-base font-medium text-bizuri-black truncate">
                        {getSectionTitle(category)}
                      </h4>
                      <span className="text-xs lg:text-sm text-muted-foreground flex-shrink-0">
                        ({categoryTranslations.length})
                      </span>
                    </div>
                    <div className="grid gap-3 lg:gap-4">
                      {categoryTranslations.map((translation) => (
                        <TranslationCard
                          key={translation.key}
                          translation={translation}
                          onUpdateTranslation={onUpdateTranslation}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Regular category view */
              <div className="grid gap-3 lg:gap-4">
                {filteredTranslations.map((translation) => (
                  <TranslationCard
                    key={translation.key}
                    translation={translation}
                    onUpdateTranslation={onUpdateTranslation}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface TranslationCardProps {
  translation: FlattenedTranslation
  onUpdateTranslation: (key: string, field: 'fr' | 'en', value: string) => void
}

function TranslationCard({ translation, onUpdateTranslation }: TranslationCardProps) {
  return (
    <Card className="w-full border-border hover:border-primary/50 transition-colors translation-card" data-key={translation.key}>
      <CardHeader className="pb-2 lg:pb-3">
        <CardTitle className="text-xs lg:text-sm font-medium text-muted-foreground break-all">
          {translation.key}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 lg:space-y-4 pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 translation-grid">
          <div className="space-y-2">
            <label className="text-xs lg:text-sm font-medium text-bizuri-black flex items-center gap-2">
              <span className="w-6 h-4 bg-blue-500 text-white text-xs flex items-center justify-center rounded flex-shrink-0">FR</span>
              <span className="truncate">Français</span>
            </label>
            {translation.fr.length > 100 ? (
              <Textarea
                value={translation.fr}
                onChange={(e) => onUpdateTranslation(translation.key, 'fr', e.target.value)}
                className="min-h-[80px] lg:min-h-[100px] bg-background border-border focus:border-primary focus:ring-primary resize-none text-sm"
                placeholder="Traduction française..."
              />
            ) : (
              <Input
                value={translation.fr}
                onChange={(e) => onUpdateTranslation(translation.key, 'fr', e.target.value)}
                className="bg-background border-border focus:border-primary focus:ring-primary text-sm"
                placeholder="Traduction française..."
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs lg:text-sm font-medium text-bizuri-black flex items-center gap-2">
              <span className="w-6 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded flex-shrink-0">EN</span>
              <span className="truncate">English</span>
            </label>
            {translation.en.length > 100 ? (
              <Textarea
                value={translation.en}
                onChange={(e) => onUpdateTranslation(translation.key, 'en', e.target.value)}
                className="min-h-[80px] lg:min-h-[100px] bg-background border-border focus:border-primary focus:ring-primary resize-none text-sm"
                placeholder="English translation..."
              />
            ) : (
              <Input
                value={translation.en}
                onChange={(e) => onUpdateTranslation(translation.key, 'en', e.target.value)}
                className="bg-background border-border focus:border-primary focus:ring-primary text-sm"
                placeholder="English translation..."
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
