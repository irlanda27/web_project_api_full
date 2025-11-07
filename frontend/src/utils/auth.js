// src/utils/auth.js

// Usa la URL del .env de Vite si existe; si no, localhost
export const BASE_URL =
  (import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  'http://localhost:3000';

// Helpers de token
export const getToken = () => localStorage.getItem('jwt') || '';
export const setToken = (token) => localStorage.setItem('jwt', token);
export const logout = () => localStorage.removeItem('jwt');

// Manejo estándar de respuestas
const handle = async (res) => {
  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch (_) {}
  if (!res.ok) {
    const err = new Error(data.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
};

// Registro de usuario (name/about/avatar son opcionales; el backend tiene defaults)
export const register = (email, password, { name, about, avatar } = {}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name, about, avatar }),
  }).then(handle);
};

// Inicio de sesión (guarda el token)
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then(handle)
    .then(({ token }) => {
      setToken(token);
      return token;
    });
};

// Validar el token (si no pasas token, usa el guardado)
export const checkToken = (token = getToken()) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(handle);
};

// Obtener tarjetas (si no pasas token, usa el guardado)
export const getCards = (token = getToken()) => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(handle);
};