
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

export const getProfileInfo = new Promise((resolve, reject) => {
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getResponseData)
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      console.log(err)
      reject();
    });
});

export const getCards = new Promise((resolve, reject) => {
  fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(getResponseData)
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      console.log(err);
      reject();
    });
});


export function saveProfileInfo(nameInput, jobInput) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  });
};

export function saveNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name.value,
      link: link.value
    })
  });
};

export function deleteCard(idCard) {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  });
};


export function addLikeCard (idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers
  })
};

export function removeLikeCard (idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

export function saveAvatar(avatarInput) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput.value,
    })
  });
};
