import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { mergeTranslations } from '@/lib/translationUtils';

const LANDING_PAGE_PATH = path.join(process.cwd(), '..', 'landing-bizuri', 'messages');

export async function GET() {
  try {
    const frPath = path.join(LANDING_PAGE_PATH, 'fr.json');
    const enPath = path.join(LANDING_PAGE_PATH, 'en.json');

    const [frContent, enContent] = await Promise.all([
      fs.readFile(frPath, 'utf-8'),
      fs.readFile(enPath, 'utf-8')
    ]);

    const frData = JSON.parse(frContent);
    const enData = JSON.parse(enContent);

    const mergedTranslations = mergeTranslations(frData, enData);

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
    const frData: any = {};
    const enData: any = {};

    translations.forEach((translation: any) => {
      setValue(frData, translation.key, translation.fr);
      setValue(enData, translation.key, translation.en);
    });

    // Write the files
    const frPath = path.join(LANDING_PAGE_PATH, 'fr.json');
    const enPath = path.join(LANDING_PAGE_PATH, 'en.json');

    await Promise.all([
      fs.writeFile(frPath, JSON.stringify(frData, null, 2), 'utf-8'),
      fs.writeFile(enPath, JSON.stringify(enData, null, 2), 'utf-8')
    ]);

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

function setValue(obj: any, path: string, value: string): void {
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
