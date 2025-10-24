'use client';
export function CategoryFilter({ value, onChange, options }: { value: string; onChange: (v:string)=>void; options: string[] }) {
  return (
    <select className="input" value={value} onChange={(e)=>onChange(e.target.value)}>
      {options.map(o => <option key={o} value={o}>{o[0].toUpperCase()+o.slice(1)}</option>)}
    </select>
  );
}
