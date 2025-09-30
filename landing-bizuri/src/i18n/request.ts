import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // Fallback to 'fr' if locale is undefined (matching middleware default)
  const currentLocale = locale || 'fr';
  
  return {
    locale: currentLocale,
    messages: (await import(`../../messages/${currentLocale}.json`)).default
  };
});
