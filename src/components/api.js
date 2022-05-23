
class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if(res.ok) {
      return res.json();
    };
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  saveProfileInfo(nameValue, jobValue) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: nameValue,
        about: jobValue
      })
    })
      .then(this._getResponseData)
  }

  saveNewCard(nameValue, linkValue) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: nameValue,
        link: linkValue
      })
    })
      .then(this._getResponseData)
  }

  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  addLikeCard (idCard) {
    return fetch(`${this._url}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  removeLikeCard (idCard) {
    return fetch(`${this._url}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  saveAvatar(avatarValue) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarValue,
      })
    })
      .then(this._getResponseData)
  }
};

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '178f9d6a-33c6-4fd5-a1f0-54c79917b762',
    'Content-Type': 'application/json'
  }
});
