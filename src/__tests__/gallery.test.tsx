import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Gallery, { filterPhotos } from '../components/Gallery';
import { PHOTOS } from '../data';

afterEach(cleanup);

describe('Gallery', () => {
  it('filters by category', () => {
    expect(filterPhotos(PHOTOS, 'All')).toHaveLength(PHOTOS.length);
    expect(filterPhotos(PHOTOS, 'Weddings').every((p) => p.category === 'Weddings')).toBe(true);
  });

  it('opens the lightbox, moves with arrow keys and closes with Escape', () => {
    render(<Gallery />);
    fireEvent.click(screen.getByRole('button', { name: `Open photo: ${PHOTOS[0].title}` }));
    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-label')).toContain(`1 of ${PHOTOS.length}`);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByRole('dialog').getAttribute('aria-label')).toContain(`2 of ${PHOTOS.length}`);
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByRole('dialog').getAttribute('aria-label')).toContain(`${PHOTOS.length} of ${PHOTOS.length}`);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('category buttons show pressed state', () => {
    render(<Gallery />);
    const btn = screen.getByRole('button', { name: 'Portraits' });
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-pressed')).toBe('true');
  });
});
