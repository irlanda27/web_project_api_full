const BASE_URL = 'http://localhost:3000';

// Registro de usuario
export const register = (email, password) => {
  console.log("Datos enviados al backend:", { email, password });

  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

// Inicio de sesión (login)
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json(); // aquí recibes el token
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

// Validar el token
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

// Obtener tarjetas (cards) del servidor
export const getCards = (token) => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // OJO: este es el token que recibiste al hacer login
    },
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}`);
  });
};