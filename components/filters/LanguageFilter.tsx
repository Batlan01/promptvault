'use client';
export function LanguageFilter({ value, onChange, options }: { value: string; onChange: (v:string)=>void; options: string[] }) {
  return (
    <select className="input" value={value} onChange={(e)=>onChange(e.target.value)}>
      {options.map(o => <option key={o} value={o}>{o.toUpperCase()}</option>)}
    </select>
  );
}
