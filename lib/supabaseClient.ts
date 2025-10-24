import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE!; // server-only
  if (!url || !key) throw new Error('Missing SUPABASE env (URL or SERVICE_ROLE)');
  return createClient(url, key, { auth: { persistSession: false } });
};

export const supabaseAnon = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !key) throw new Error('Missing NEXT_PUBLIC_SUPABASE env');
  return createClient(url, key, { auth: { persistSession: false } });
};
