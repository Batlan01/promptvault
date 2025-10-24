'use client';

import { useState } from 'react';

export type PromptItem = {
  id: string;
  title: string;
  description?: string;
  prompt: string;
  category: string;
  language: string;
  author?: string;
  tags?: string[];
  likes?: number;
  created_at?: string;
};

export function PromptCard({ item }: { item: PromptItem }) {
  const [copied, setCopied] = useState(false);
  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      setTimeout(()=>setCopied(false), 1200);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <article className="card">
      <header className="mb-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold">{item.title}</h3>
          <span className="badge uppercase">{item.language}</span>
        </div>
        <div className="small mt-1 text-slate-500">
          <span>{item.category}</span>
          {item.author ? <span> • by {item.author}</span> : null}
        </div>
      </header>
      {item.description ? <p className="text-sm mb-3">{item.description}</p> : null}
      <pre className="text-xs bg-slate-950/70 text-slate-100 p-3 rounded-lg overflow-x-auto max-h-48">{item.prompt}</pre>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {(item.tags||[]).map(t => <span key={t} className="badge">#{t}</span>)}
        </div>
        <button className="btn btn-primary" onClick={doCopy}>
          {copied ? 'Copied ✔' : 'Copy'}
        </button>
      </div>
    </article>
  );
}
