const base = import.meta.env.BASE_URL;

export const WIDTHS = [640, 1280, 2000] as const;

export const imgSrc = (file: string, width: (typeof WIDTHS)[number] = 1280) => `${base}images/${file}-${width}.webp`;

export const imgSrcSet = (file: string) => WIDTHS.map((w) => `${imgSrc(file, w)} ${w}w`).join(', ');
