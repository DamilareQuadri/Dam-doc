import apiClient from './client';

/**
 * Symptom catalog endpoints (require an authenticated user).
 * All methods resolve to the response body (see client.js interceptor).
 */
export const symptomApi = {
  // GET /symptoms -> array of { id, name }
  // Optional `search` does a case-insensitive substring filter server-side.
  getAll: (search) =>
    apiClient.get('/symptoms', { params: search ? { search } : undefined }),
};

export default symptomApi;
