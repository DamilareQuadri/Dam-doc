import axios from 'axios';

// Base URL comes from the Vite env (.env / .env.local). Falls back to a local
// backend so `npm run dev` still works if no env file is present.
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const baseURL = rawBaseUrl.replace(/\/+$/, ''); // strip any trailing slash(es)

/**
 * Shared axios instance ("request processor") for all backend calls.
 *
 *  - Injects the auth token on every request.
 *  - Unwraps successful responses down to `response.data`.
 *  - Normalizes failures into a single Error with a readable `.message`,
 *    plus `.status` / `.data` for callers that need them.
 *  - Clears the session and redirects to /login on 401 (expired/invalid token).
 */
const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// --- Request interceptor: attach the bearer token ---------------------------
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response interceptor: unwrap data + normalize errors -------------------
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;

    // Token missing/expired -> drop the session and send the user to login.
    // (Login/register validation errors are 400, so this only fires for real
    // auth failures on protected routes.)
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    const normalizedError = new Error(message);
    normalizedError.status = status;
    normalizedError.data = error.response?.data;
    return Promise.reject(normalizedError);
  }
);

export default apiClient;
