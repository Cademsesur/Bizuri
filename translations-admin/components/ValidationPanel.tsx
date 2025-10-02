'use client'

import { ValidationError } from '@/lib/validation'
import { AlertTriangle, X, Navigation } from 'lucide-react'

interface ValidationPanelProps {
  errors: ValidationError[]
  warnings: ValidationError[]
  onNavigateToField: (key: string) => void
  onClose: () => void
}

export function ValidationPanel({ errors, warnings, onNavigateToField, onClose }: ValidationPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold text-foreground">
              Validation des traductions
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {errors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-red-600 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Erreurs ({errors.length})
              </h3>
              <div className="space-y-2">
                {errors.map((error, index) => (
                  <div
                    key={index}
                    className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-800 dark:text-red-200">
                          {error.field}
                        </p>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                          {error.message}
                        </p>
                      </div>
                      <button
                        onClick={() => onNavigateToField(error.field)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
                      >
                        <Navigation className="h-3 w-3" />
                        Aller
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {warnings.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-yellow-600 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Avertissements ({warnings.length})
              </h3>
              <div className="space-y-2">
                {warnings.map((warning, index) => (
                  <div
                    key={index}
                    className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          {warning.field}
                        </p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                          {warning.message}
                        </p>
                      </div>
                      <button
                        onClick={() => onNavigateToField(warning.field)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded hover:bg-yellow-200 dark:hover:bg-yellow-700 transition-colors"
                      >
                        <Navigation className="h-3 w-3" />
                        Aller
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
