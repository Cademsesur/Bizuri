import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const MESSAGES_PATH = path.join(process.cwd(), 'messages');

export async function GET() {
  try {
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
      en: enData
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
    const { fr, en } = await request.json();

    if (!fr || !en) {
      return NextResponse.json(
        { success: false, error: 'Invalid translations data' },
        { status: 400 }
      );
    }

    // Write the files
    const frPath = path.join(MESSAGES_PATH, 'fr.json');
    const enPath = path.join(MESSAGES_PATH, 'en.json');

    await Promise.all([
      fs.writeFile(frPath, JSON.stringify(fr, null, 2), 'utf-8'),
      fs.writeFile(enPath, JSON.stringify(en, null, 2), 'utf-8')
    ]);

    return NextResponse.json({
      success: true,
      message: 'Translations updated successfully'
    });
  } catch (error) {
    console.error('Error saving translations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save translation files' },
      { status: 500 }
    );
  }
}
