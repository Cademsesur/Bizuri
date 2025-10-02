import { NextRequest, NextResponse } from 'next/server';
import { mergeTranslations } from '@/lib/translationUtils';

// URL de l'API du projet landing-bizuri
const LANDING_API_URL = process.env.LANDING_API_URL || 'http://localhost:3000';

export async function GET() {
  try {
    // Appel à l'API du projet landing
    const response = await fetch(`${LANDING_API_URL}/api/translations`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from landing API: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error('Landing API returned error');
    }

    const mergedTranslations = mergeTranslations(data.fr, data.en);

    return NextResponse.json({
      success: true,
      translations: mergedTranslations,
      totalKeys: mergedTranslations.length
    });
  } catch (error) {
    console.error('Error reading translations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read translation files' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { translations } = await request.json();

    if (!translations || !Array.isArray(translations)) {
      return NextResponse.json(
        { success: false, error: 'Invalid translations data' },
        { status: 400 }
      );
    }

    // Rebuild the JSON structures
    const frData: Record<string, unknown> = {};
    const enData: Record<string, unknown> = {};

    translations.forEach((translation: { key: string; fr: string; en: string }) => {
      setValue(frData, translation.key, translation.fr);
      setValue(enData, translation.key, translation.en);
    });

    // Envoyer les données à l'API du projet landing
    const response = await fetch(`${LANDING_API_URL}/api/translations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fr: frData, en: enData }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save to landing API: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error('Landing API returned error');
    }

    return NextResponse.json({
      success: true,
      message: 'Translations saved successfully',
      updatedKeys: translations.length
    });
  } catch (error) {
    console.error('Error saving translations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save translation files' },
      { status: 500 }
    );
  }
}

function setValue(obj: Record<string, unknown>, path: string, value: string): void {
  const keys = path.split('.');
  let current: Record<string, unknown> = obj;
  
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key] as Record<string, unknown>;
    }
  });
}
