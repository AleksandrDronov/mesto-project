
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '178f9d6a-33c6-4fd5-a1f0-54c79917b762',
    'Content-Type': 'application/json'
  }
};

export function getResponseData(res) {
  if(res.ok) {
    return res.json();
  };
  return Promise.reject(`Ошибка: ${res.status}`);
} ;

export function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getResponseData)
};

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(getResponseData)
};


export function saveProfileInfo(nameInput, jobInput) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
    .then(getResponseData)
};

export function saveNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name.value,
      link: link.value
    })
  })
    .then(getResponseData)
};

export function deleteCard(idCard) {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getResponseData)
};


export function addLikeCard (idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(getResponseData)
};

export function removeLikeCard (idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getResponseData)
};

export function saveAvatar(avatarInput) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput.value,
    })
  })
    .then(getResponseData)
};
