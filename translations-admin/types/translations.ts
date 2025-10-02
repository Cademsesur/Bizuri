export interface TranslationItem {
  id: string;
  key: string;
  fr: string;
  en: string;
  category: string;
  subcategory?: string;
  description?: string;
}

export interface TranslationCategory {
  name: string;
  key: string;
  subcategories?: string[];
}

export interface TranslationData {
  [key: string]: any;
}

export interface FlattenedTranslation {
  key: string;
  fr: string;
  en: string;
  category: string;
  subcategory?: string;
}
