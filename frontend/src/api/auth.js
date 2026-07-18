import apiClient from './client';

/**
 * Authentication endpoints.
 * All methods resolve to the response body (see client.js interceptor).
 */
export const authApi = {
  // POST /auth/register -> { message }
  register: ({ fullName, email, password }) =>
    apiClient.post('/auth/register', { fullName, email, password }),

  // POST /auth/login -> { token, user }
  login: ({ email, password }) =>
    apiClient.post('/auth/login', { email, password }),
};

export default authApi;
