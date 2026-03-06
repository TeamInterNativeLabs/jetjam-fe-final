// Central env with fallbacks so app works even if Vercel env vars are missing
const API_BASE = import.meta.env.VITE_APP_BASE_URL || 'http://13.60.82.114:5000/jetjams/v1/api';
const IMAGE_BASE = import.meta.env.VITE_APP_IMAGE_BASE_URL || 'http://13.60.82.114:5000';
// Optional: if backend returns filename only and serves at e.g. /uploads/ set to "uploads"
const IMAGE_PATH_PREFIX = (import.meta.env.VITE_APP_IMAGE_PATH_PREFIX || '').replace(/^\/+|\/+$/g, '');

export const getApiBaseUrl = () => API_BASE;
export const getImageBaseUrl = () => IMAGE_BASE;

/** Build full image/media URL; if path is already absolute (http/https) return as-is */
export const imageUrl = (path) => {
  if (!path) return '';
  const p = String(path).trim().replace(/\\/g, '/');
  if (/^https?:\/\//i.test(p)) return p;
  const base = IMAGE_BASE.replace(/\/$/, '');
  let relative = p.replace(/^\/+/, '');
  // If path is just a filename (no /) and we have a prefix, prepend it
  if (relative && IMAGE_PATH_PREFIX && !relative.includes('/')) {
    relative = `${IMAGE_PATH_PREFIX}/${relative}`;
  }
  return relative ? `${base}/${relative}` : base;
};
