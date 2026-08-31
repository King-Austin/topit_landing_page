import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dxmlguoupnzgskpwxolb.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_publishable_id-rHwqQdHM3FQ-mUhrCyg_6JVAjqnY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const APK_URL = 'https://expo.dev/artifacts/eas/PGi7k8329vACvH5HObESoEgGQRLZtkE0DENcX3GxZME.apk';
const TEMP_FILE = path.join(process.cwd(), 'temp-topit-release.apk');

async function downloadFileWithFetch(url, dest) {
  console.log(`🌐 Fetching APK with redirect follow...`);
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
  console.log('⏳ Downloading latest APK from Expo artifacts...');
  console.log(`🔗 URL: ${APK_URL}`);

  try {
    await downloadFileWithFetch(APK_URL, TEMP_FILE);
    const stats = fs.statSync(TEMP_FILE);
    const fileSizeMb = parseFloat((stats.size / (1024 * 1024)).toFixed(2));
    console.log(`✅ Downloaded successfully: ${fileSizeMb} MB`);

    const fileBuffer = fs.readFileSync(TEMP_FILE);

    console.log('🚀 Uploading to Supabase Storage bucket "app-releases"...');
    
    // 1. Upload topit-latest.apk
    const { error: err1 } = await supabase.storage
      .from('app-releases')
      .upload('topit-latest.apk', fileBuffer, {
        contentType: 'application/vnd.android.package-archive',
        upsert: true
      });

    if (err1) {
      console.error('Upload topit-latest.apk error:', err1);
    } else {
      console.log('✅ Uploaded topit-latest.apk to Supabase Storage');
    }

    // 2. Upload topit-v1.0.0.apk
    const { error: err2 } = await supabase.storage
      .from('app-releases')
      .upload('topit-v1.0.0.apk', fileBuffer, {
        contentType: 'application/vnd.android.package-archive',
        upsert: true
      });

    if (err2) {
      console.error('Upload topit-v1.0.0.apk error:', err2);
    } else {
      console.log('✅ Uploaded topit-v1.0.0.apk to Supabase Storage');
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/app-releases/topit-latest.apk`;

    // 3. Register release in app_releases table
    console.log('📝 Registering release in app_releases table...');
    const { data: releaseData, error: dbError } = await supabase
      .from('app_releases')
      .upsert({
        version: '1.0.0',
        build_number: 1,
        platform: 'android',
        file_size_mb: fileSizeMb,
        download_url: publicUrl,
        changelog: [
          'Instant SME and Direct Data Top-Up for MTN, Airtel, and Glo',
          'Cashback rewards on all airtime & data recharges',
          'Dedicated Virtual Account funding via Moniepoint & Wema Bank',
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
    fs.copyFileSync(TEMP_FILE, publicDest);
    console.log(`✅ Copied to local public folder: ${publicDest}`);

    // Clean temp file
    fs.unlinkSync(TEMP_FILE);

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
