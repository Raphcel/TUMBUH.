/**
 * Base API client — wraps fetch with auth, JSON handling, and error mapping.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

/* ─── Token helpers ─────────────────────────────────────────── */

let _token = localStorage.getItem('token');

export function setToken(token) {
  _token = token;
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

export function getToken() {
  return _token;
}

/* ─── Core request function ─────────────────────────────────── */

async function request(
  path,
  { method = 'GET', body, headers = {}, ...opts } = {}
) {
  const cfg = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(_token ? { Authorization: `Bearer ${_token}` } : {}),
      ...headers,
    },
    ...opts,
  };

  if (body !== undefined) {
    cfg.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, cfg);

  // 204 No Content
  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.detail || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

/* ─── Convenience methods ───────────────────────────────────── */

export const api = {
  get: (path, opts) => request(path, { method: 'GET', ...opts }),
  post: (path, body, opts) => request(path, { method: 'POST', body, ...opts }),
  put: (path, body, opts) => request(path, { method: 'PUT', body, ...opts }),
  patch: (path, body, opts) =>
    request(path, { method: 'PATCH', body, ...opts }),
  delete: (path, opts) => request(path, { method: 'DELETE', ...opts }),
};

export default api;
