// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
//   headers: {
//     authorization: '178f9d6a-33c6-4fd5-a1f0-54c79917b762',
//     'Content-Type': 'application/json'
//   }
// };

// export function getResponseData(res) {
//   if(res.ok) {
//     return res.json();
//   };
//   return Promise.reject(`Ошибка: ${res.status}`);
// } ;

// export function getProfileInfo() {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers
//   })
//     .then(getResponseData)
// };

// export function getCards() {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers
//   })
//     .then(getResponseData)
// };


// export function saveProfileInfo(nameInput, jobInput) {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       name: nameInput.value,
//       about: jobInput.value
//     })
//   })
//     .then(getResponseData)
// };

// export function saveNewCard(name, link) {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: 'POST',
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name.value,
//       link: link.value
//     })
//   })
//     .then(getResponseData)
// };

// export function deleteCard(idCard) {
//   return fetch(`${config.baseUrl}/cards/${idCard}`, {
//     method: 'DELETE',
//     headers: config.headers
//   })
//     .then(getResponseData)
// };


// export function addLikeCard (idCard) {
//   return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
//     method: 'PUT',
//     headers: config.headers
//   })
//     .then(getResponseData)
// };

// export function removeLikeCard (idCard) {
//   return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
//     method: 'DELETE',
//     headers: config.headers
//   })
//     .then(getResponseData)
// };

// export function saveAvatar(avatarInput) {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       avatar: avatarInput.value,
//     })
//   })
//     .then(getResponseData)
// };

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

  getProfileInfo() {
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

  saveProfileInfo(nameInput, jobInput) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
      })
    })
      .then(this._getResponseData)
      .then((result) => {
        profileTitle.textContent = result.name;
        profileSubtitle.textContent = result.about;
        closePopup(popupProfile);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButton.textContent = nameButton;
      });
  }

  saveNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name.value,
        link: link.value
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

  saveAvatar(avatarInput) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarInput.value,
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
