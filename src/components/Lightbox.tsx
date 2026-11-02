import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Photo } from '../data';
import { imgSrc, imgSrcSet } from '../lib/images';

type Props = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function Lightbox({ photos, index, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];
  const prev = () => onNavigate((index - 1 + photos.length) % photos.length);
  const next = () => onNavigate((index + 1) % photos.length);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title} – photo ${index + 1} of ${photos.length}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <motion.figure
        key={photo.id}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex max-h-full flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imgSrc(photo.file, 2000)}
          srcSet={imgSrcSet(photo.file)}
          sizes="90vw"
          alt={photo.alt}
          className="max-h-[82vh] w-auto max-w-full object-contain"
        />
        <figcaption className="mt-4 text-center text-sm text-white/70">
          <span className="font-serif text-lg text-white">{photo.title}</span> · {photo.category} · {index + 1} / {photos.length}
        </figcaption>
      </motion.figure>

      <button ref={closeRef} type="button" aria-label="Close" onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20">
        <X size={22} />
      </button>
      {photos.length > 1 && (
        <>
          <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20">
            <ChevronLeft size={24} />
          </button>
          <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20">
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}
