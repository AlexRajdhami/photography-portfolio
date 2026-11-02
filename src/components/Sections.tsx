import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { FAQS, PACKAGES, PHOTOGRAPHER, PHOTOS, STEPS, STUDIO } from '../data';
import { imgSrc, imgSrcSet } from '../lib/images';
import { formatGBP } from '../lib/validation';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7 },
};

const photo = (id: string) => PHOTOS.find((p) => p.id === id)!;

export function Hero() {
  const p = photo('sunset');
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <motion.img
        src={imgSrc(p.file, 2000)}
        srcSet={imgSrcSet(p.file)}
        sizes="100vw"
        alt={p.alt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[center_60%]"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
      <motion.div {...reveal} className="relative mx-auto w-full max-w-6xl px-4 pb-20 md:px-6 md:pb-28">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/80">{STUDIO.tagline}</p>
        <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] md:text-7xl">Honest photos of the moments that matter.</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#booking" className="rounded-full bg-white px-7 py-3 text-sm text-neutral-900 transition hover:bg-neutral-200">Book a shoot</a>
          <a href="#portfolio" className="rounded-full border border-white/50 px-7 py-3 text-sm transition hover:bg-white/10">View portfolio</a>
        </div>
      </motion.div>
    </section>
  );
}

export function About() {
  const p = photo('window');
  return (
    <section id="about" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <motion.img {...reveal} src={imgSrc(p.file, 1280)} srcSet={imgSrcSet(p.file)} sizes="(min-width: 768px) 50vw, 100vw"
          alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover" />
        <motion.div {...reveal}>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/50">About the studio</p>
          <h2 className="mb-6 font-serif text-4xl md:text-5xl">Natural light, real emotion, no stiff poses.</h2>
          <p className="mb-4 leading-relaxed text-white/75">
            {STUDIO.name} photographs couples, weddings and portraits across {STUDIO.location}. The style is calm and cinematic:
            golden hour by the sea, quiet black and white details, and portraits in soft window light.
          </p>
          <p className="leading-relaxed text-white/75">
            Every session is relaxed and guided, so you can forget the camera and just be yourselves.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 text-center">
            <div><dt className="text-xs uppercase tracking-wider text-white/50">Style</dt><dd className="mt-1 font-serif text-xl">Cinematic</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-white/50">Delivery</dt><dd className="mt-1 font-serif text-xl">10 days</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-white/50">Based in</dt><dd className="mt-1 font-serif text-xl">London</dd></div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

export function Process() {
  const p = photo('embrace');
  return (
    <section id="process" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <motion.div {...reveal}>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/50">How it works</p>
          <h2 className="mb-8 font-serif text-4xl md:text-5xl">From first message to final gallery</h2>
          <ol className="space-y-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-5 border-b border-white/10 pb-6">
                <span className="font-serif text-3xl text-white/40">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-serif text-2xl">{s.title}</h3>
                  <p className="mt-1 text-white/70">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>
        <motion.img {...reveal} src={imgSrc(p.file, 1280)} srcSet={imgSrcSet(p.file)} sizes="(min-width: 768px) 50vw, 100vw"
          alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover" />
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/50">Investment</p>
        <h2 className="mb-12 font-serif text-4xl md:text-5xl">Packages</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <motion.article {...reveal} key={pkg.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${pkg.popular ? 'border-white bg-white/[0.04]' : 'border-white/15'}`}>
              {pkg.popular && (
                <span className="absolute -top-3 left-8 rounded-full bg-white px-3 py-1 text-xs text-neutral-900">Most popular</span>
              )}
              <h3 className="font-serif text-3xl">{pkg.name}</h3>
              <p className="mt-1 text-sm text-white/60">{pkg.duration}</p>
              <p className="my-6 text-4xl font-light">
                <span className="text-base text-white/60">from </span>{formatGBP(pkg.price)}
              </p>
              <ul className="mb-8 space-y-3 text-sm text-white/80">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-3"><Check size={18} className="shrink-0 text-white/60" aria-hidden />{f}</li>
                ))}
              </ul>
              <a href={`#booking`} data-package={pkg.name}
                className={`mt-auto rounded-full px-6 py-3 text-center text-sm transition ${
                  pkg.popular ? 'bg-white text-neutral-900 hover:bg-neutral-200' : 'border border-white/40 hover:bg-white/10'
                }`}
                onClick={() => window.dispatchEvent(new CustomEvent('choose-package', { detail: pkg.name }))}>
                Choose {pkg.name}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/50">Good to know</p>
        <h2 className="mb-10 font-serif text-4xl md:text-5xl">Questions</h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl">
                {f.q}
                <ChevronDown size={20} className="shrink-0 transition group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 leading-relaxed text-white/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 text-sm text-white/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 md:px-6">
        <div>
          <p className="font-serif text-2xl text-white">{STUDIO.name}</p>
          <p className="mt-1">© {new Date().getFullYear()} · All photographs © {PHOTOGRAPHER}</p>
        </div>
        <p className="max-w-md">
          Website template designed and built by{' '}
          <a className="underline underline-offset-4 hover:text-white" href="https://github.com/AlexRajdhami" target="_blank" rel="noopener noreferrer">{PHOTOGRAPHER}</a>.
          {' '}{STUDIO.name} is a demo brand.
        </p>
      </div>
    </footer>
  );
}
