'use client';

import { useMemo, useState } from 'react';
import type { PromptItem } from './PromptCard';
import { PromptCard } from './PromptCard';
import { CategoryFilter } from './filters/CategoryFilter';
import { LanguageFilter } from './filters/LanguageFilter';

export default function FeedClient({ items }: { items: PromptItem[] }) {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [lang, setLang] = useState<string>('all');

  const categories = useMemo(() => ['all', ...Array.from(new Set(items.map(i => i.category))).sort()], [items]);
  const languages = useMemo(() => ['all', ...Array.from(new Set(items.map(i => (i.language||'en').toLowerCase()))).sort()], [items]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter(p => {
      const hitQ = !query || [p.title, p.description, p.prompt, p.author, p.category, ...(p.tags||[])].join(' ').toLowerCase().includes(query);
      const hitC = category === 'all' || p.category === category;
      const hitL = lang === 'all' || (p.language||'en').toLowerCase() === lang;
      return hitQ && hitC && hitL;
    });
  }, [q, category, lang, items]);

  return (
    <main>
      <section className="card mb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input className="input" placeholder="Search prompts, tags, authors…" value={q} onChange={(e)=>setQ(e.target.value)} />
          <div className="flex gap-2">
            <CategoryFilter value={category} onChange={setCategory} options={categories} />
            <LanguageFilter value={lang} onChange={setLang} options={languages} />
          </div>
        </div>
      </section>
      <section className="grid-cards">
        {filtered.map(p => <PromptCard key={p.id} item={p} />)}
        {filtered.length === 0 && <div className="card col-span-full text-center py-10 small">No prompts found.</div>}
      </section>
    </main>
  );
}
