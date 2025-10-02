import {getRequestConfig} from 'next-intl/server';
import { supabase } from '../../lib/supabase';
 
async function getTranslationsFromSupabase() {
  try {
    console.log('Attempting to fetch translations from Supabase...');
    
    // Try to get latest translations from Supabase
    const { data: translations, error } = await supabase
      .from('translations')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (!error && translations && translations.length > 0) {
      console.log('Successfully retrieved translations from Supabase');
      return {
        fr: translations[0].fr_data,
        en: translations[0].en_data
      };
    }
    
    if (error) {
      console.error('Supabase error:', error);
    } else {
      console.log('No translations found in Supabase');
    }
  } catch (error) {
    console.error('Error fetching from Supabase:', error);
  }
  
  // Fallback to local files if Supabase fails
  return null;
}

export default getRequestConfig(async ({locale}) => {
  // Fallback to 'fr' if locale is undefined (matching middleware default)
  const currentLocale = locale || 'fr';
  
  // Try to get translations from Supabase first
  const supabaseTranslations = await getTranslationsFromSupabase();
  
  let messages;
  if (supabaseTranslations && supabaseTranslations[currentLocale as keyof typeof supabaseTranslations]) {
    // Use Supabase data
    messages = supabaseTranslations[currentLocale as keyof typeof supabaseTranslations];
    console.log(`Loading ${currentLocale} translations from Supabase`);
  } else {
    // Fallback to local files
    console.log(`Loading ${currentLocale} translations from local files`);
    messages = (await import(`../../messages/${currentLocale}.json`)).default;
  }
  
  return {
    locale: currentLocale,
    messages
  };
});
