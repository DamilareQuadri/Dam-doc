import apiClient from './client';

/**
 * Diagnosis endpoints (all require an authenticated user).
 * All methods resolve to the response body (see client.js interceptor).
 */
export const diagnosisApi = {
  // POST /diagnose -> diagnosis result
  // `symptoms` is an array of { name, severity }.
  diagnose: (symptoms) => apiClient.post('/diagnose', { symptoms }),

  // GET /history -> array of past diagnoses
  getHistory: () => apiClient.get('/history'),

  // POST /retain -> persists a confirmed case into the case base
  retain: (payload) => apiClient.post('/retain', payload),
};

export default diagnosisApi;
