// All site content in one place – edit this file to reuse the template for another photographer.

export type Category = 'Couples' | 'Weddings' | 'Portraits';

export type Photo = {
  id: string;
  file: string; // base name in public/images (…-640/1280/2000.webp)
  title: string;
  category: Category;
  alt: string;
  orientation: 'portrait' | 'landscape';
};

export const STUDIO = {
  name: 'Lumière Studio',
  tagline: 'Couple, wedding & portrait photography',
  location: 'London & the South East',
  email: 'hello@lumiere-studio.example',
  instagram: 'https://instagram.com',
};

export const PHOTOS: Photo[] = [
  { id: 'sunset', file: 'sunset-silhouette', title: 'Golden Hour', category: 'Couples', orientation: 'portrait',
    alt: 'Couple silhouetted against a sunset by the sea, sharing a kiss beside a rocky cliff' },
  { id: 'bouquet', file: 'wedding-bouquet', title: 'Just Married', category: 'Weddings', orientation: 'portrait',
    alt: 'Bride lifting her bouquet into the air while embracing the groom by the sea' },
  { id: 'couple-bw', file: 'couple-bw', title: 'Close', category: 'Couples', orientation: 'portrait',
    alt: 'Black and white close-up of a couple about to kiss' },
  { id: 'beach', file: 'beach-portrait', title: 'Shoreline', category: 'Portraits', orientation: 'landscape',
    alt: 'Woman walking out of turquoise waves on a sunny beach' },
  { id: 'embrace', file: 'embrace-bw', title: 'Tender', category: 'Couples', orientation: 'portrait',
    alt: 'Black and white detail of hands wrapped around a shoulder in an embrace' },
  { id: 'window', file: 'window-portrait', title: 'Natural Light', category: 'Portraits', orientation: 'portrait',
    alt: 'Portrait of a young woman with freckles looking into the camera in soft window light' },
  { id: 'morning', file: 'morning-light', title: 'Morning', category: 'Portraits', orientation: 'portrait',
    alt: 'Woman sitting on a bed in warm, low morning light, looking away from the camera' },
];

export const CATEGORIES: ('All' | Category)[] = ['All', 'Couples', 'Weddings', 'Portraits'];

export type Package = { name: string; price: number; duration: string; features: string[]; popular?: boolean };

export const PACKAGES: Package[] = [
  { name: 'Portrait', price: 180, duration: '1 hour', features: ['1 location', '15 edited photos', 'Private online gallery', 'Delivery in 10 days'] },
  { name: 'Couple', price: 260, duration: '1.5 hours', popular: true,
    features: ['1–2 locations', '25 edited photos', 'Posing guidance', 'Private online gallery', 'Delivery in 10 days'] },
  { name: 'Wedding', price: 1200, duration: 'Up to 8 hours',
    features: ['Ceremony to first dance', '300+ edited photos', 'Pre-wedding consultation', 'Second shooter option', 'Delivery in 4 weeks'] },
];

export const STEPS = [
  { title: 'Hello', text: 'Send an enquiry with your date and ideas. I reply within 24 hours.' },
  { title: 'Plan', text: 'A short call to plan locations, outfits and the feel of your shoot.' },
  { title: 'Shoot', text: 'A relaxed session with gentle direction, so you can simply enjoy it.' },
  { title: 'Gallery', text: 'Your edited photos arrive in a private online gallery, ready to download.' },
];

export const FAQS = [
  { q: 'How do I book a date?', a: 'Send an enquiry using the form below. A 25% deposit secures your date and the rest is due a week before the shoot.' },
  { q: 'Do you travel?', a: 'Yes. Travel within 30 miles is included. Further afield is charged at cost, and destination weddings are welcome.' },
  { q: 'Can we get the RAW files?', a: 'RAW files are not included, but every photo in your gallery is professionally edited and delivered in full resolution.' },
  { q: 'What if it rains?', a: 'Rain can make beautiful photos! If the weather is truly awful we can move your session free of charge.' },
];

export const PHOTOGRAPHER = 'Alex Rajdhami';
