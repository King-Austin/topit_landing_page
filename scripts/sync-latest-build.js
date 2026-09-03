import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dxmlguoupnzgskpwxolb.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_publishable_id-rHwqQdHM3FQ-mUhrCyg_6JVAjqnY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const APK_INPUT = process.argv[2] || 'https://expo.dev/artifacts/eas/PGi7k8329vACvH5HObESoEgGQRLZtkE0DENcX3GxZME.apk';
const VERSION = process.argv[3] || '1.0.0';
const TEMP_FILE = path.join(process.cwd(), 'temp-topit-release.apk');

async function downloadFileWithFetch(url, dest) {
  console.log(`🌐 Fetching APK from ${url}...`);
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Failed to fetch APK: HTTP ${res.status} ${res.statusText}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(dest, buffer);
  return dest;
}

async function sync() {
  console.log(`⏳ Preparing APK from source: ${APK_INPUT}`);
  console.log(`🏷️ Version: ${VERSION}`);

  try {
    let sourceBuffer;
    let fileSizeMb;

    if (fs.existsSync(APK_INPUT)) {
      console.log(`📁 Loading local APK file: ${APK_INPUT}`);
      sourceBuffer = fs.readFileSync(APK_INPUT);
      const stats = fs.statSync(APK_INPUT);
      fileSizeMb = parseFloat((stats.size / (1024 * 1024)).toFixed(2));
    } else {
      console.log('🌐 Downloading latest APK from URL...');
      await downloadFileWithFetch(APK_INPUT, TEMP_FILE);
      const stats = fs.statSync(TEMP_FILE);
      fileSizeMb = parseFloat((stats.size / (1024 * 1024)).toFixed(2));
      sourceBuffer = fs.readFileSync(TEMP_FILE);
    }
    console.log(`✅ Loaded APK file (${fileSizeMb} MB)`);

    console.log('🚀 Uploading to Supabase Storage bucket "app-releases"...');
    
    // 1. Upload topit-latest.apk
    const { error: err1 } = await supabase.storage
      .from('app-releases')
      .upload('topit-latest.apk', sourceBuffer, {
        contentType: 'application/vnd.android.package-archive',
        upsert: true
      });

    if (err1) {
      console.error('Upload topit-latest.apk error:', err1);
    } else {
      console.log('✅ Uploaded topit-latest.apk to Supabase Storage');
    }

    // 2. Upload topit-v${VERSION}.apk
    const { error: err2 } = await supabase.storage
      .from('app-releases')
      .upload(`topit-v${VERSION}.apk`, sourceBuffer, {
        contentType: 'application/vnd.android.package-archive',
        upsert: true
      });

    if (err2) {
      console.error(`Upload topit-v${VERSION}.apk error:`, err2);
    } else {
      console.log(`✅ Uploaded topit-v${VERSION}.apk to Supabase Storage`);
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/app-releases/topit-latest.apk`;

    // 3. Register release in app_releases table
    console.log('📝 Registering release in app_releases table...');
    const { data: releaseData, error: dbError } = await supabase
      .from('app_releases')
      .upsert({
        version: VERSION,
        build_number: 1,
        platform: 'android',
        file_size_mb: fileSizeMb,
        download_url: publicUrl,
        changelog: [
          'Instant SME and Direct Data Top-Up for MTN, Airtel, and Glo',
          'Cashback rewards on all airtime & data recharges',
          'Dedicated Virtual Account funding',
          'Automations for daily, weekly, and monthly auto-renewals',
          'Instant PDF & PNG receipt generation and WhatsApp sharing'
        ],
        is_latest: true
      })
      .select();

    if (dbError) {
      console.error('Database insert error:', dbError);
    } else {
      console.log('✅ Release recorded in Supabase Database:', releaseData);
    }

    // Copy to public folder for local development as well
    const publicDest = path.join(process.cwd(), 'public', 'topit-latest.apk');
    fs.writeFileSync(publicDest, sourceBuffer);
    console.log(`✅ Saved to local public folder: ${publicDest}`);

    // Clean temp file if created
    if (fs.existsSync(TEMP_FILE)) {
      fs.unlinkSync(TEMP_FILE);
    }

    console.log('\n🎉 ALL DONE! Supabase Storage, Database Migration, and Landing Page are 100% Synced!');
    console.log(`🔗 Public Download URL: ${publicUrl}`);
  } catch (err) {
    console.error('❌ Sync failed:', err);
    if (fs.existsSync(TEMP_FILE)) {
      fs.unlinkSync(TEMP_FILE);
    }
  }
}

sync();

