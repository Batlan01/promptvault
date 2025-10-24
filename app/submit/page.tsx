'use client';

import { useState } from 'react';
import type { PromptItem } from '@/components/PromptCard';

export default function SubmitPage() {
  const [form, setForm] = useState<PromptItem>({
    id: '',
    title: '',
    description: '',
    prompt: '',
    category: 'General',
    language: 'en',
    author: 'Anonymous',
    tags: []
  });
  const [busy, setBusy] = useState(false);

  const onChange = (k: keyof PromptItem, v: any) => setForm(s => ({ ...s, [k]: v }));

  const onSubmit = async () => {
    if (!form.title || !form.prompt) { alert('Title and Prompt are required.'); return; }
    setBusy(true);
    try {
      const res = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error(await res.text());
      const saved = await res.json();
      alert('Submitted ✔');
      // reset
      setForm({ id:'', title:'', description:'', prompt:'', category:'General', language:'en', author:'Anonymous', tags:[] });
    } catch (e:any) {
      console.error(e);
      alert('Failed: ' + e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid gap-4">
      <div className="card">
        <h2 className="text-lg font-semibold mb-3">Submit a Prompt</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <label className="grid gap-1">
            <span className="small">Title</span>
            <input className="input" value={form.title} onChange={e=>onChange('title', e.target.value)} />
          </label>
          <label className="grid gap-1">
            <span className="small">Category</span>
            <input className="input" value={form.category} onChange={e=>onChange('category', e.target.value)} placeholder="e.g., Marketing" />
          </label>
          <label className="grid gap-1">
            <span className="small">Language</span>
            <select className="input" value={form.language} onChange={e=>onChange('language', e.target.value)}>
              <option value="en">English</option>
              <option value="hu">Magyar</option>
              <option value="de">Deutsch</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="small">Author</span>
            <input className="input" value={form.author||''} onChange={e=>onChange('author', e.target.value)} placeholder="Your name or alias" />
          </label>
          <label className="md:col-span-2 grid gap-1">
            <span className="small">Short description</span>
            <input className="input" value={form.description||''} onChange={e=>onChange('description', e.target.value)} placeholder="What does this prompt do?" />
          </label>
          <label className="md:col-span-2 grid gap-1">
            <span className="small">Prompt text</span>
            <textarea className="input min-h-[180px]" value={form.prompt} onChange={e=>onChange('prompt', e.target.value)} placeholder="Paste your prompt here…" />
          </label>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button className="btn btn-primary" onClick={onSubmit} disabled={busy}>{busy ? 'Submitting…' : 'Submit'}</button>
          <a className="btn" href="/">Back to Feed</a>
        </div>
      </div>
      <div className="card">
        <h3 className="font-medium mb-2">Data storage</h3>
        <p className="small">
          This page posts to <code>/api/prompts</code> which writes to the Supabase <code>prompts</code> table.
        </p>
      </div>
    </main>
  );
}
