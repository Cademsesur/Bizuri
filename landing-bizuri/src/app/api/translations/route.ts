import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { supabase } from '../../../../lib/supabase';

const MESSAGES_PATH = path.join(process.cwd(), 'messages');

export async function GET() {
  try {
    // Try to get translations from Supabase first
    const { data: translations, error } = await supabase
      .from('translations')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (!error && translations && translations.length > 0) {
      // Return data from Supabase
      return NextResponse.json({
        success: true,
        fr: translations[0].fr_data,
        en: translations[0].en_data,
        source: 'supabase'
      });
    }

    // Fallback to local files if Supabase fails or no data
    const frPath = path.join(MESSAGES_PATH, 'fr.json');
    const enPath = path.join(MESSAGES_PATH, 'en.json');

    const [frContent, enContent] = await Promise.all([
      fs.readFile(frPath, 'utf-8'),
      fs.readFile(enPath, 'utf-8')
    ]);

    const frData = JSON.parse(frContent);
    const enData = JSON.parse(enContent);

    return NextResponse.json({
      success: true,
      fr: frData,
      en: enData,
      source: 'files'
    });
  } catch (error) {
    console.error('Error reading translations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read translation data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { fr, en } = await request.json();

    if (!fr || !en) {
      return NextResponse.json(
        { success: false, error: 'Invalid translations data' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('translations')
      .insert([
        {
          fr_data: fr,
          en_data: en,
          updated_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save translations to database' },
        { status: 500 }
      );
    }

    // Optional: Also try to update local files in development
    if (!process.env.VERCEL) {
      try {
        const frPath = path.join(MESSAGES_PATH, 'fr.json');
        const enPath = path.join(MESSAGES_PATH, 'en.json');

        await Promise.all([
          fs.writeFile(frPath, JSON.stringify(fr, null, 2), 'utf-8'),
          fs.writeFile(enPath, JSON.stringify(en, null, 2), 'utf-8')
        ]);
      } catch (fileError) {
        console.log('Could not update local files:', fileError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Translations saved successfully to database',
      data: data
    });
  } catch (error) {
    console.error('Error processing translations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process translation data' },
      { status: 500 }
    );
  }
}
