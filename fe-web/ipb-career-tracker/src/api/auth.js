/**
 * Auth API — login, register, current user.
 */
import api, { setToken } from './client';

export const authApi = {
  /**
   * Login and store the JWT token.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{access_token: string, token_type: string}>}
   */
  async login(email, password) {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Login failed');
    setToken(data.access_token);
    return data;
  },

  /**
   * Register a new user.
   */
  register(payload) {
    return api.post('/auth/register', payload);
  },

  /**
   * Get the currently authenticated user.
   */
  me() {
    return api.get('/auth/me');
  },

  /**
   * Logout — clear the stored token.
   */
  logout() {
    setToken(null);
  },
};

export default authApi;
