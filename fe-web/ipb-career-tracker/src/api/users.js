/**
 * Users API — get/update profile.
 */
import api from './client';

export const usersApi = {
  /** Get a user by ID */
  get(id) {
    return api.get(`/users/${id}`);
  },

  /** Update current user profile */
  update(id, payload) {
    return api.put(`/users/${id}`, payload);
  },
};

export default usersApi;
