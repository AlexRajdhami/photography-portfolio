import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORIES, PHOTOS, type Photo } from '../data';
import { imgSrc, imgSrcSet } from '../lib/images';
import Lightbox from './Lightbox';

export function filterPhotos(photos: Photo[], category: string) {
  return category === 'All' ? photos : photos.filter((p) => p.category === category);
}

export default function Gallery({ photos = PHOTOS }: { photos?: Photo[] }) {
  const [category, setCategory] = useState<string>('All');
  const [open, setOpen] = useState<number | null>(null);
  const shown = useMemo(() => filterPhotos(photos, category), [photos, category]);

  return (
    <section id="portfolio" className="scroll-mt-16 py-20 md:py-28" aria-labelledby="portfolio-title">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/50">Selected work</p>
            <h2 id="portfolio-title" className="font-serif text-4xl md:text-5xl">Portfolio</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  category === c ? 'border-white bg-white text-neutral-900' : 'border-white/20 text-white/80 hover:border-white/60'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          <AnimatePresence mode="popLayout">
            {shown.map((photo, i) => (
              <motion.li
                layout
                key={photo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block w-full overflow-hidden rounded-lg bg-neutral-900 text-left"
                  aria-label={`Open photo: ${photo.title}`}
                >
                  <img
                    src={imgSrc(photo.file, 640)}
                    srcSet={imgSrcSet(photo.file)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    alt={photo.alt}
                    loading="lazy"
                    className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
                      photo.orientation === 'portrait' ? 'aspect-[2/3]' : 'aspect-[3/2]'
                    }`}
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4">
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-white/70">{photo.category}</span>
                    <span className="font-serif text-xl">{photo.title}</span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      {open !== null && (
        <Lightbox photos={shown} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
      )}
    </section>
  );
}
