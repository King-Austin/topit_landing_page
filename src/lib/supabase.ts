import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://dxmlguoupnzgskpwxolb.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_id-rHwqQdHM3FQ-mUhrCyg_6JVAjqnY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface AppReleaseInfo {
  version: string;
  buildNumber: number;
  fileSizeMb: number;
  releaseDate: string;
  downloadUrl: string;
  changelog: string[];
}

export const FALLBACK_RELEASE: AppReleaseInfo = {
  version: '1.0.0',
  buildNumber: 1,
  fileSizeMb: 130.0,
  releaseDate: 'Sep 4, 2026',
  downloadUrl: 'https://pub-3c9a9ceed97f4e45b2215723d77fa85d.r2.dev/topit/topit-latest.apk',
  changelog: [
    'Initial public release with lightning-fast top-up services',
    'Instant Airtime and Data top-up for MTN, Airtel, and Glo',
    'Dedicated Virtual Account wallet funding with instant balance update',
    '0.5% instant cashback on all airtime and data purchases',
    'Smart automations and scheduled auto-renewals',
    'Instant receipt generation & sharing in PDF and PNG',
    'Biometric security & instant transaction verification'
  ]
};

export async function fetchLatestRelease(): Promise<AppReleaseInfo> {
  try {
    // Attempt to query 'app_releases' table if present in Supabase
    const { data, error } = await supabase
      .from('app_releases')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return FALLBACK_RELEASE;
    }

    return {
      version: data.version || FALLBACK_RELEASE.version,
      buildNumber: data.build_number || FALLBACK_RELEASE.buildNumber,
      fileSizeMb: data.file_size_mb || FALLBACK_RELEASE.fileSizeMb,
      releaseDate: data.created_at ? new Date(data.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Sep 1, 2026',
      downloadUrl: FALLBACK_RELEASE.downloadUrl, // Force use of R2 URL instead of DB
      changelog: data.changelog || FALLBACK_RELEASE.changelog,
    };
  } catch (err) {
    console.warn('Failed to load dynamic release info from Supabase, using fallback configuration', err);
    return FALLBACK_RELEASE;
  }
}
