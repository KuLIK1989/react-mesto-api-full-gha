import config from "./config";

class Api {
  constructor(config) {
    this._config = config;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getInitialCards() {
    return fetch(`${this._config.url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${ localStorage.getItem('token') }`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }
  getUser() {
    return fetch(`${this._config.url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${ localStorage.getItem('token') }`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }
  getInitialData() {
    return Promise.all([this.getUser(), this.getInitialCards()]);
  }
  setUserInfo(info) {
    return fetch(`${this._config.url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${ localStorage.getItem('token') }`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info),
    }).then(this._checkResponse);
  }
  setCard(info) {
    return fetch(`${this._config.url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${ localStorage.getItem('token') }`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info),
    }).then(this._checkResponse);
  }
  toggleLikeCard({ idCard, methodCardLike }) {
    return fetch(`${this._config.url}/cards/${idCard}/likes`, {
      method: methodCardLike,
      headers: {
        authorization: `Bearer ${ localStorage.getItem('token') }`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }
  deleteCard(idCard) {
    return fetch(`${this._config.url}/cards/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${ localStorage.getItem('token') }`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }
  setAvatar(info) {
    return fetch(`${this._config.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${ localStorage.getItem('token') }`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info),
    }).then(this._checkResponse);
  }
}
const api = new Api(config);
export default api;
