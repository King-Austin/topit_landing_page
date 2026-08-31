/**
 * Topit APK Upload Helper Script
 * Uploads an APK file to Supabase Storage bucket 'app-releases'
 * 
 * Usage:
 *   node scripts/upload-apk.js path/to/your-app.apk [optional-version]
 * Example:
 *   node scripts/upload-apk.js ./topit-v1.0.0.apk 1.0.0
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dxmlguoupnzgskpwxolb.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_id-rHwqQdHM3FQ-mUhrCyg_6JVAjqnY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadApk() {
  const apkPath = process.argv[2];
  const version = process.argv[3] || '1.0.0';

  if (!apkPath) {
    console.error('❌ Error: Please provide the path to your APK file.');
    console.log('Usage: node scripts/upload-apk.js <path-to-apk-file> [version]');
    process.exit(1);
  }

  if (!fs.existsSync(apkPath)) {
    console.error(`❌ Error: File not found at path: ${apkPath}`);
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(apkPath);
  const stats = fs.statSync(apkPath);
  const fileSizeMb = (stats.size / (1024 * 1024)).toFixed(2);

  console.log(`📦 Found APK: ${path.basename(apkPath)} (${fileSizeMb} MB)`);
  console.log(`🚀 Uploading to Supabase Storage bucket 'app-releases'...`);

  try {
    // 1. Upload as 'topit-latest.apk' (Fixed permalink for the landing page)
    const { error: uploadError } = await supabase.storage
      .from('app-releases')
      .upload('topit-latest.apk', fileBuffer, {
        contentType: 'application/vnd.android.package-archive',
        upsert: true
      });

    if (uploadError) {
      if (uploadError.message.includes('Bucket not found')) {
        console.error('⚠️ The bucket "app-releases" does not exist in your Supabase project yet.');
        console.log('👉 Please go to Supabase Dashboard -> Storage -> "New Bucket" -> Name it "app-releases" -> Set to Public.');
      }
      throw uploadError;
    }

    // 2. Also archive as versioned file: topit-v1.0.0.apk
    await supabase.storage
      .from('app-releases')
      .upload(`topit-v${version}.apk`, fileBuffer, {
        contentType: 'application/vnd.android.package-archive',
        upsert: true
      });

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/app-releases/topit-latest.apk`;

    console.log('✅ Upload Successful!');
    console.log(`🔗 Public Download URL: ${publicUrl}`);
    console.log(`📱 Your landing page is now live with this build!`);
  } catch (err) {
    console.error('❌ Upload failed:', err.message || err);
  }
}

uploadApk();
