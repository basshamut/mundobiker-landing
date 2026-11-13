function normalizeSiteUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

const envUrl =
  process.env.PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;

export const siteUrl = envUrl
  ? normalizeSiteUrl(envUrl)
  : 'https://placeholder.invalid';

export const isSiteResolved = siteUrl !== 'https://placeholder.invalid';
