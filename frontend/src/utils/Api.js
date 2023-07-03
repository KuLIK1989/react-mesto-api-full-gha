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
      headers: this._config.headers,
    }).then(this._checkResponse);
  }
  getUser() {
    return fetch(`${this._config.url}/users/me`, {
      method: "GET",
      headers: this._config.headers,
    }).then(this._checkResponse);
  }
  getInitialData() {
    return Promise.all([this.getUser(), this.getInitialCards()]);
  }
  setUserInfo(info) {
    return fetch(`${this._config.url}/users/me`, {
      method: "PATCH",
      headers: this._config.headers,
      body: JSON.stringify(info),
    }).then(this._checkResponse);
  }
  setCard(info) {
    return fetch(`${this._config.url}/cards`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify(info),
    }).then(this._checkResponse);
  }
  toggleLikeCard({ idCard, methodCardLike }) {
    return fetch(`${this._config.url}/cards/${idCard}/likes`, {
      method: methodCardLike,
      headers: this._config.headers,
    }).then(this._checkResponse);
  }
  deleteCard(idCard) {
    return fetch(`${this._config.url}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._config.headers,
    }).then(this._checkResponse);
  }
  setAvatar(info) {
    return fetch(`${this._config.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._config.headers,
      body: JSON.stringify(info),
    }).then(this._checkResponse);
  }
}
const api = new Api(config);
export default api;
