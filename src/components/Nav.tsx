import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO } from '../data';

const LINKS = [
  ['#portfolio', 'Portfolio'],
  ['#about', 'About'],
  ['#process', 'Process'],
  ['#pricing', 'Pricing'],
  ['#faq', 'FAQ'],
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? 'bg-neutral-950/90 backdrop-blur border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6" aria-label="Main">
        <a href="#top" className="font-serif text-2xl tracking-wide">{STUDIO.name}</a>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {LINKS.map(([href, label]) => (
            <li key={href}><a className="text-white/80 transition hover:text-white" href={href}>{label}</a></li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#booking" className="hidden rounded-full bg-white px-5 py-2 text-sm text-neutral-900 transition hover:bg-neutral-200 sm:inline-block">
            Book a shoot
          </a>
          <button
            type="button"
            className="rounded-full p-2 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-white/10 px-4 pb-6 md:hidden">
          {[...LINKS, ['#booking', 'Book a shoot'] as const].map(([href, label]) => (
            <li key={href}>
              <a className="block border-b border-white/10 py-4 text-lg" href={href} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
