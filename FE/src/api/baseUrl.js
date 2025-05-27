const baseurl = import.meta.env.VITE_BASE_URL;

export function mainRequestUrl(endpoint) {
  return `${baseurl}${endpoint}`;
}