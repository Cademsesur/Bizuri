import { TranslationData, FlattenedTranslation } from '@/types/translations';

export function flattenTranslations(data: TranslationData, prefix = '', category = ''): FlattenedTranslation[] {
  const result: FlattenedTranslation[] = [];
  
  Object.entries(data).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const currentCategory = category || key;
    
    if (typeof value === 'string') {
      // This is a leaf value, we need to find its counterpart in other language
      result.push({
        key: fullKey,
        fr: '', // Will be filled when comparing both files
        en: '', // Will be filled when comparing both files
        category: currentCategory,
      });
    } else if (typeof value === 'object' && value !== null) {
      // Recurse into nested objects
      result.push(...flattenTranslations(value, fullKey, currentCategory));
    }
  });
  
  return result;
}

export function buildTranslationsFromFlat(translations: FlattenedTranslation[], language: 'fr' | 'en'): TranslationData {
  const result: TranslationData = {};
  
  translations.forEach(translation => {
    const keys = translation.key.split('.');
    let current = result;
    
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        // Last key, set the value
        current[key] = translation[language];
      } else {
        // Intermediate key, ensure object exists
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
    });
  });
  
  return result;
}

export function mergeTranslations(frData: TranslationData, enData: TranslationData): FlattenedTranslation[] {
  const frFlat = flattenTranslations(frData);
  const enFlat = flattenTranslations(enData);
  
  // Create a map of all unique keys
  const allKeys = new Set([...frFlat.map(t => t.key), ...enFlat.map(t => t.key)]);
  
  return Array.from(allKeys).map(key => {
    const frTranslation = frFlat.find(t => t.key === key);
    const enTranslation = enFlat.find(t => t.key === key);
    
    return {
      key,
      fr: getValue(frData, key) || '',
      en: getValue(enData, key) || '',
      category: frTranslation?.category || enTranslation?.category || 'unknown',
    };
  });
}

function getValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : '';
  }, obj);
}

export function setValue(obj: any, path: string, value: string): void {
  const keys = path.split('.');
  let current = obj;
  
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
  });
}
