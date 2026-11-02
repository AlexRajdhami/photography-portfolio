export type BookingValues = {
  name: string;
  email: string;
  date: string; // yyyy-mm-dd
  package: string;
  message: string;
};

export type BookingErrors = Partial<Record<keyof BookingValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validate the booking form. `today` can be passed in to make tests predictable. */
export function validateBooking(v: BookingValues, today: Date = new Date()): BookingErrors {
  const errors: BookingErrors = {};
  if (v.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL.test(v.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!v.package) errors.package = 'Please choose a package.';
  if (!v.date) {
    errors.date = 'Please choose a preferred date.';
  } else {
    const chosen = new Date(`${v.date}T00:00:00`);
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (Number.isNaN(chosen.getTime())) errors.date = 'Please choose a valid date.';
    else if (chosen <= start) errors.date = 'Please choose a date in the future.';
  }
  if (v.message.trim().length < 10) errors.message = 'Tell me a little about your shoot (at least 10 characters).';
  return errors;
}

export const formatGBP = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);
