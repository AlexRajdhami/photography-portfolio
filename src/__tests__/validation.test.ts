import { describe, expect, it } from 'vitest';
import { formatGBP, validateBooking } from '../lib/validation';

const today = new Date(2026, 10, 2); // 2 Nov 2026
const good = { name: 'Alex', email: 'alex@example.com', date: '2026-12-01', package: 'Couple', message: 'Sunset shoot on the beach' };

describe('validateBooking', () => {
  it('accepts a complete enquiry', () => {
    expect(validateBooking(good, today)).toEqual({});
  });
  it('flags every missing field', () => {
    const e = validateBooking({ name: '', email: '', date: '', package: '', message: '' }, today);
    expect(Object.keys(e).sort()).toEqual(['date', 'email', 'message', 'name', 'package']);
  });
  it('rejects past and same-day dates', () => {
    expect(validateBooking({ ...good, date: '2026-11-02' }, today).date).toMatch(/future/);
    expect(validateBooking({ ...good, date: '2025-01-01' }, today).date).toMatch(/future/);
  });
  it('rejects a bad email', () => {
    expect(validateBooking({ ...good, email: 'alex@' }, today).email).toBeDefined();
  });
});

describe('formatGBP', () => {
  it('formats whole pounds', () => {
    expect(formatGBP(1200)).toBe('£1,200');
  });
});
