// Central entry point for the API layer.
// Usage: import { authApi, diagnosisApi, symptomApi } from '../api';
export { default as apiClient } from './client';
export { authApi } from './auth';
export { diagnosisApi } from './diagnosis';
export { symptomApi } from './symptoms';
