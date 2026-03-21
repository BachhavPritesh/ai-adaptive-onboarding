// Configuration file for API URLs
const getApiUrl = () => {
  // For production (Netlify, Vercel)
  if (import.meta.env.PROD) {
    return 'https://ai-adaptive-onboarding.onrender.com/api';
  }
  // For development (localhost)
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

const getAuthUrl = () => {
  const apiUrl = getApiUrl();
  return apiUrl.replace('/api', '');
};

export const API_URL = getApiUrl();
export const AUTH_URL = getAuthUrl();
