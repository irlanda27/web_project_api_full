class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  editUser({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  likeButton(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }
}

const apiInstance = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "53f3933b-4210-4c65-8e4b-9438424c1772",
    "Content-Type": "application/json",
  },
});

export default apiInstance;
