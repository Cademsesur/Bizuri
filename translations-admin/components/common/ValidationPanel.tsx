'use client'

import { ValidationError } from '@/lib/validation'
import { AlertTriangle, XCircle, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ValidationPanelProps {
  errors: ValidationError[]
  warnings: ValidationError[]
  onNavigateToField: (key: string) => void
  onClose: () => void
}

export function ValidationPanel({ errors, warnings, onNavigateToField, onClose }: ValidationPanelProps) {
  if (errors.length === 0 && warnings.length === 0) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Validation des traductions
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[60vh]">
          {errors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Erreurs ({errors.length})
              </h3>
              <div className="space-y-2">
                {errors.map((error, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-red-50 border border-red-200 rounded-md cursor-pointer hover:bg-red-100"
                    onClick={() => onNavigateToField(error.key)}
                  >
                    <div className="font-medium text-red-800">
                      {error.key} ({error.field === 'fr' ? '🇫🇷' : '🇬🇧'})
                    </div>
                    <div className="text-sm text-red-600">{error.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {warnings.length > 0 && (
            <div>
              <h3 className="font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Avertissements ({warnings.length})
              </h3>
              <div className="space-y-2">
                {warnings.map((warning, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-yellow-50 border border-yellow-200 rounded-md cursor-pointer hover:bg-yellow-100"
                    onClick={() => onNavigateToField(warning.key)}
                  >
                    <div className="font-medium text-yellow-800">
                      {warning.key} ({warning.field === 'fr' ? '🇫🇷' : '🇬🇧'})
                    </div>
                    <div className="text-sm text-yellow-600">{warning.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="text-sm text-blue-800">
              <strong>Note :</strong> Les erreurs doivent être corrigées avant la sauvegarde. 
              Les avertissements sont optionnels mais recommandés.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
