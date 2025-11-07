// src/utils/api.js

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._token = localStorage.getItem('jwt') || '';
  }

  // por si quieres actualizar el token después de login
  setToken(token) {
    this._token = token;
    localStorage.setItem('jwt', token);
  }

  _headers() {
    // lee el token más reciente (por si cambió en localStorage)
    const token = localStorage.getItem('jwt') || this._token || '';
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  }

  _check(res) {
    if (!res.ok) {
      return res.json().catch(() => ({})).then((body) => {
        const err = new Error(body.message || `HTTP ${res.status}`);
        err.status = res.status;
        err.body = body;
        throw err;
      });
    }
    return res.json();
  }

  // -------- USERS --------
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers(),
    }).then(this._check);
  }

  editUser({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers(),
      body: JSON.stringify({ name, about }),
    }).then(this._check);
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers(),
      body: JSON.stringify({ avatar }),
    }).then(this._check);
  }

  // -------- CARDS --------
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers(),
    }).then(this._check);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ name, link }),
    }).then(this._check);
  }

  likeButton(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers(),
    }).then(this._check);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers(),
    }).then(this._check);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers(),
    }).then(this._check);
  }
}

// Usa variable de entorno de Vite si existe
const BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:3000';

const apiInstance = new Api({ baseUrl: BASE_URL });

export default apiInstance;