import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (e:any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Basic validation
    const title = (body.title||'').toString().trim();
    const prompt = (body.prompt||'').toString().trim();
    const category = (body.category||'General').toString().trim();
    const language = (body.language||'en').toString().trim().toLowerCase();
    const description = (body.description||'').toString().trim();
    const author = (body.author||'Anonymous').toString().trim();
    const tags = Array.isArray(body.tags) ? body.tags.slice(0, 12) : [];

    if (!title || !prompt) {
      return NextResponse.json({ error: 'Title and prompt are required.' }, { status: 400 });
    }
    if (title.length > 140) {
      return NextResponse.json({ error: 'Title too long (max 140 chars).' }, { status: 400 });
    }
    if (prompt.length > 8000) {
      return NextResponse.json({ error: 'Prompt too long (max 8000 chars).' }, { status: 400 });
    }

    const sb = supabaseAdmin();
    const { data, error } = await sb.from('prompts').insert([{
      title, prompt, category, language, description, author, tags
    }]).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch (e:any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
