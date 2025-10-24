import "../styles/globals.css";
import type { Metadata } from "next";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "PromptVault — Open Prompt Library",
  description: "A minimal, open prompt library powered by Supabase.",
  icons: { icon: "/logo.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx("min-h-screen")}>
        <div className="container py-6">
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="PromptVault" className="h-8 w-8 rounded-lg" />
              <h1 className="text-lg font-semibold">PromptVault</h1>
            </div>
            <nav className="flex items-center gap-2">
              <a className="btn" href="/">Feed</a>
              <a className="btn" href="/submit">Submit</a>
              <ThemeToggle />
            </nav>
          </header>
          {children}
          <footer className="mt-10 text-center small">
            Built with Next.js + Supabase • <a href="https://vercel.com" target="_blank">Vercel</a>
          </footer>
        </div>
      </body>
    </html>
  );
}

function ThemeToggle() {
  const init = `(function(){try{const k='pv-theme';const s=localStorage.getItem(k);const p=matchMedia('(prefers-color-scheme: dark)').matches;const on=s? s==='dark': p;document.documentElement.classList.toggle('dark', on);}catch(e){}})();`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: init }} />
      <button
        className="btn"
        onClick={() => {
          const html = document.documentElement;
          const on = !html.classList.contains('dark');
          html.classList.toggle('dark', on);
          try { localStorage.setItem('pv-theme', on ? 'dark' : 'light'); } catch(e){}
        }}
      >🌓 Theme</button>
    </>
  );
}
