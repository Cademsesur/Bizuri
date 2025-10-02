import { FlattenedTranslation } from '@/types/translations'

export interface ValidationError {
  key: string
  field: 'fr' | 'en'
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

export function validateTranslations(translations: FlattenedTranslation[]): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  translations.forEach(translation => {
    // Check for empty required fields
    if (!translation.fr.trim()) {
      errors.push({
        key: translation.key,
        field: 'fr',
        message: 'Le texte français ne peut pas être vide'
      })
    }

    if (!translation.en.trim()) {
      errors.push({
        key: translation.key,
        field: 'en',
        message: 'Le texte anglais ne peut pas être vide'
      })
    }

    // Check for potential issues
    if (translation.fr.length > 500) {
      warnings.push({
        key: translation.key,
        field: 'fr',
        message: 'Texte très long (>500 caractères) - peut affecter la mise en page'
      })
    }

    if (translation.en.length > 500) {
      warnings.push({
        key: translation.key,
        field: 'en',
        message: 'Text very long (>500 characters) - may affect layout'
      })
    }

    // Check for length discrepancy between languages
    const frLength = translation.fr.length
    const enLength = translation.en.length
    const lengthRatio = Math.max(frLength, enLength) / Math.min(frLength, enLength)
    
    if (lengthRatio > 2 && Math.min(frLength, enLength) > 20) {
      warnings.push({
        key: translation.key,
        field: frLength > enLength ? 'fr' : 'en',
        message: 'Différence de longueur importante entre les langues'
      })
    }

    // Check for missing HTML tags balance
    const frHtmlTags = (translation.fr.match(/<[^>]+>/g) || []).length
    const enHtmlTags = (translation.en.match(/<[^>]+>/g) || []).length
    
    if (frHtmlTags !== enHtmlTags && (frHtmlTags > 0 || enHtmlTags > 0)) {
      warnings.push({
        key: translation.key,
        field: frHtmlTags > enHtmlTags ? 'en' : 'fr',
        message: 'Balises HTML manquantes ou en nombre différent'
      })
    }

    // Check for placeholder consistency ({{variable}})
    const frPlaceholders = (translation.fr.match(/\{\{[^}]+\}\}/g) || [])
    const enPlaceholders = (translation.en.match(/\{\{[^}]+\}\}/g) || [])
    
    if (frPlaceholders.length !== enPlaceholders.length) {
      errors.push({
        key: translation.key,
        field: frPlaceholders.length > enPlaceholders.length ? 'en' : 'fr',
        message: 'Variables manquantes ou différentes entre les langues'
      })
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

export function getCriticalCategories(): string[] {
  return ['metadata', 'hero', 'pricing', 'navigation']
}

export function validateCriticalFields(translations: FlattenedTranslation[]): ValidationError[] {
  const criticalCategories = getCriticalCategories()
  const criticalErrors: ValidationError[] = []

  translations
    .filter(t => criticalCategories.includes(t.category))
    .forEach(translation => {
      if (!translation.fr.trim() || !translation.en.trim()) {
        criticalErrors.push({
          key: translation.key,
          field: !translation.fr.trim() ? 'fr' : 'en',
          message: 'Champ critique requis pour le fonctionnement du site'
        })
      }
    })

  return criticalErrors
}
