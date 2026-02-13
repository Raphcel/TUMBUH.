/**
 * Opportunities API — list, get, create, update, delete, and company-scoped list.
 */
import api from './client';

export const opportunitiesApi = {
  list(skip = 0, limit = 100) {
    return api.get(`/opportunities/?skip=${skip}&limit=${limit}`);
  },

  get(id) {
    return api.get(`/opportunities/${id}`);
  },

  listByCompany(companyId, skip = 0, limit = 100) {
    return api.get(
      `/opportunities/company/${companyId}?skip=${skip}&limit=${limit}`
    );
  },

  create(payload) {
    return api.post('/opportunities/', payload);
  },

  update(id, payload) {
    return api.put(`/opportunities/${id}`, payload);
  },

  delete(id) {
    return api.delete(`/opportunities/${id}`);
  },
};

export default opportunitiesApi;
