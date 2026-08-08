const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// No caching in development so admin changes are immediately visible.
// In production, revalidate every 60 seconds.
const FETCH_OPTIONS =
  process.env.NODE_ENV === 'development'
    ? { cache: 'no-store' }
    : { next: { revalidate: 60 } };

async function fetchAPI(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, FETCH_OPTIONS);
    if (!res.ok) {
      console.error(`[api] ${path} -> HTTP ${res.status}`);
      return null;
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    console.error(`[api] ${path} failed:`, err?.message || err);
    return null;
  }
}

export const getHomeData = () => fetchAPI('/home/main');
export const getAboutData = () => fetchAPI('/about/main');
export const getGalleryData = () => fetchAPI('/gallery/main');
export const getKiwanoData = () => fetchAPI('/kiwano/main');
export const getKiwanoVillamentData = () => fetchAPI('/kiwano-villament/main');
export const getServiceMainData = () => fetchAPI('/services/main');
export const getProjects = () => fetchAPI('/projects');
export const getTestimonialsMainData = () => fetchAPI('/testimonials-main/main');
export const getProjectsMainData = () => fetchAPI('/projects-main/main');
export const getContactMainData = () => fetchAPI('/contact-main/main');
