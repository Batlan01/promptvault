import FeedClient from '@/components/FeedClient';
import { supabaseAdmin } from '@/lib/supabaseClient';

export default async function HomePage() {
  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(60);
  if (error) {
    console.error(error);
  }
  return <FeedClient items={data || []} />;
}
