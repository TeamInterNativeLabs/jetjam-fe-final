// Central env with safe fallbacks.
// IMPORTANT: In production on Vercel (HTTPS), direct HTTP backend calls are blocked (Mixed Content).
// We proxy through Vercel rewrites (/api/* and /uploads/*) to keep everything HTTPS.

const hardcodedDevApiFallback = 'http://13.60.82.114:5000/jetjams/v1/api';
const hardcodedDevImageFallback = 'http://13.60.82.114:5000';

const IMAGE_PATH_PREFIX = (import.meta.env.VITE_APP_IMAGE_PATH_PREFIX || '').replace(/^\/+|\/+$/g, '');

const getOrigin = () => (typeof window !== 'undefined' ? window.location.origin : '');

const isHttpsPage = () =>
  typeof window !== 'undefined' && window.location && window.location.protocol === 'https:';

const isInsecureHttpUrl = (value) => typeof value === 'string' && value.trim().toLowerCase().startsWith('http://');

export const getApiBaseUrl = () => {
  const fromEnv = import.meta.env.VITE_APP_BASE_URL;
  if (fromEnv && !(isHttpsPage() && isInsecureHttpUrl(fromEnv))) return fromEnv;

  // Production default: same-origin proxy (via vercel.json rewrites)
  if (import.meta.env.PROD) return `${getOrigin()}/api`;

  // Dev default
  return hardcodedDevApiFallback;
};

export const getImageBaseUrl = () => {
  const fromEnv = import.meta.env.VITE_APP_IMAGE_BASE_URL;
  if (fromEnv && !(isHttpsPage() && isInsecureHttpUrl(fromEnv))) return fromEnv;

  // Production default: same-origin (and /uploads is proxied)
  if (import.meta.env.PROD) return getOrigin();

  // Dev default
  return hardcodedDevImageFallback;
};

/** Build full image/media URL; if path is already absolute (http/https) return as-is */
export const imageUrl = (path) => {
  if (!path) return '';
  const p = String(path).trim().replace(/\\/g, '/');
  if (/^https?:\/\//i.test(p)) return p;
  const base = getImageBaseUrl().replace(/\/$/, '');
  let relative = p.replace(/^\/+/, '');
  // If path is just a filename (no /) and we have a prefix, prepend it
  if (relative && IMAGE_PATH_PREFIX && !relative.includes('/')) {
    relative = `${IMAGE_PATH_PREFIX}/${relative}`;
  }
  return relative ? `${base}/${relative}` : base;
};
