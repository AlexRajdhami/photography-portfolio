import { useEffect, useState, type FormEvent } from 'react';
import { Mail, Send } from 'lucide-react';
import { PACKAGES, PHOTOS, STUDIO } from '../data';
import { imgSrc, imgSrcSet } from '../lib/images';
import { validateBooking, type BookingErrors, type BookingValues } from '../lib/validation';

// Optional: set VITE_FORMSPREE_ID to receive real enquiries by email (https://formspree.io).
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

const empty: BookingValues = { name: '', email: '', date: '', package: '', message: '' };
type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Booking() {
  const [values, setValues] = useState<BookingValues>(empty);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const p = PHOTOS.find((x) => x.id === 'couple-bw')!;

  useEffect(() => {
    const onChoose = (e: Event) => setValues((v) => ({ ...v, package: (e as CustomEvent<string>).detail }));
    window.addEventListener('choose-package', onChoose);
    return () => window.removeEventListener('choose-package', onChoose);
  }, []);

  const set = (field: keyof BookingValues) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateBooking(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`booking-${first}`)?.focus();
      return;
    }
    if (!FORMSPREE_ID) {
      setStatus('sent'); // demo mode
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field = (name: keyof BookingValues) => ({
    id: `booking-${name}`,
    name,
    value: values[name],
    onChange: set(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `booking-${name}-error` : undefined,
    className: `w-full rounded-lg border bg-white/[0.03] px-4 py-3 outline-none transition focus:border-white ${
      errors[name] ? 'border-red-400' : 'border-white/20'
    }`,
  });
  const error = (name: keyof BookingValues) =>
    errors[name] ? <p id={`booking-${name}-error`} className="mt-1 text-sm text-red-300">{errors[name]}</p> : null;

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().slice(0, 10);

  return (
    <section id="booking" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 md:grid-cols-2 md:px-6">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/50">Enquiries</p>
          <h2 className="mb-4 font-serif text-4xl md:text-5xl">Book your shoot</h2>
          <p className="mb-8 text-white/70">Tell me your date and what you have in mind. I reply within 24 hours.</p>

          {status === 'sent' ? (
            <div role="status" className="rounded-2xl border border-white/20 bg-white/[0.04] p-8">
              <h3 className="font-serif text-3xl">Thank you, {values.name.trim().split(' ')[0]}!</h3>
              <p className="mt-3 text-white/70">
                Your enquiry for a <strong>{values.package}</strong> session on{' '}
                <strong>{new Date(`${values.date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>{' '}
                {FORMSPREE_ID ? 'has been sent.' : 'has been received (demo mode – nothing was sent).'}
              </p>
              <button type="button" className="mt-6 text-sm underline underline-offset-4"
                onClick={() => { setValues(empty); setStatus('idle'); }}>Send another enquiry</button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="booking-name" className="mb-2 block text-sm text-white/80">Name</label>
                <input {...field('name')} autoComplete="name" />
                {error('name')}
              </div>
              <div>
                <label htmlFor="booking-email" className="mb-2 block text-sm text-white/80">Email</label>
                <input {...field('email')} type="email" autoComplete="email" />
                {error('email')}
              </div>
              <div>
                <label htmlFor="booking-package" className="mb-2 block text-sm text-white/80">Package</label>
                <select {...field('package')}>
                  <option value="" className="bg-neutral-900">Choose…</option>
                  {PACKAGES.map((pk) => <option key={pk.name} className="bg-neutral-900">{pk.name}</option>)}
                </select>
                {error('package')}
              </div>
              <div>
                <label htmlFor="booking-date" className="mb-2 block text-sm text-white/80">Preferred date</label>
                <input {...field('date')} type="date" min={minDate} className={`${field('date').className} [color-scheme:dark]`} />
                {error('date')}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="booking-message" className="mb-2 block text-sm text-white/80">Your ideas</label>
                <textarea {...field('message')} rows={5} placeholder="Location, number of people, the feel you're after…" />
                {error('message')}
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button type="submit" disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm text-neutral-900 transition hover:bg-neutral-200 disabled:opacity-60">
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'} <Send size={16} aria-hidden />
                </button>
                {status === 'error' && <p role="alert" className="text-sm text-red-300">Sorry, something went wrong. Please email instead.</p>}
              </div>
              {!FORMSPREE_ID && <p className="text-xs text-white/40 sm:col-span-2">Demo template: enquiries are not sent anywhere.</p>}
            </form>
          )}

          <a href={`mailto:${STUDIO.email}`} className="mt-10 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <Mail size={18} aria-hidden /> {STUDIO.email}
          </a>
        </div>

        <img src={imgSrc(p.file, 1280)} srcSet={imgSrcSet(p.file)} sizes="(min-width: 768px) 50vw, 100vw" alt={p.alt}
          loading="lazy" className="hidden aspect-[4/5] w-full rounded-lg object-cover md:block" />
      </div>
    </section>
  );
}
