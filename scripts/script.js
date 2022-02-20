const page = document.querySelector('.page');
const profileOpenButton = page.querySelector('.profile__toggle');
const popupCloseButton = page.querySelector('.popup__toggle');
const popupProfile = page.querySelector('.popup_type_profile');
const popupAddPic = page.querySelector('.popup_type_add-pic');
const popupFullPic = page.querySelector('.popup_type_full-pic');
const addPicOpenButton = page.querySelector('.profile__add-button');
const addPicCloseButton = popupAddPic.querySelector('.popup__toggle');
const addFullPicCloseButton = popupFullPic.querySelector('.popup__toggle');
const profileForm =  page.querySelector('.form');
const addPicForm =  popupAddPic.querySelector('.form');
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');

//карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//попап профиля
profileOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});
popupCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

// попап добавления картинки
addPicOpenButton.addEventListener('click', () => {
  openPopup(popupAddPic);

});
addPicCloseButton.addEventListener('click', () => {
  closePopup(popupAddPic);
});

//submit профиля
const nameInput = profileForm.querySelector('.form__item_name');
const jobInput = profileForm.querySelector('.form__item_job');

function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

profileForm.addEventListener('submit', submitProfileForm);

//карточки из "коробки"
const cardsList = page.querySelector('.photo-grid__list');
const cardTemplate = page.querySelector('.card-template').content;

function renderCard(card, container) {
  container.prepend(card);
}

// функция создания карточки
function createCard(cardName, cardUrl) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.photo-grid__image').src = cardUrl;
  cardElement.querySelector('.photo-grid__image').alt = cardName;
  cardElement.querySelector('.photo-grid__title').textContent = cardName;

  return cardElement;
};

initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  renderCard(card, cardsList);
});

// submit карточки
function addPicFormSubmit(evt) {
  evt.preventDefault();
  const placeInput = addPicForm.querySelector('.form__item_place');
  const urlInput = addPicForm.querySelector('.form__item_url');

  const cardElement = createCard(placeInput.value, urlInput.value);

  const likeButton = cardElement.querySelector('.photo-grid__button');
  const trashButton = cardElement.querySelector('.photo-grid__trash');
  const image = cardElement.querySelector('.photo-grid__image');

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('photo-grid__button_active');
  });
  trashButton.addEventListener('click', () => {
    const listItem = trashButton.closest('.photo-grid__card');
    listItem.remove();
  });

  cardElement.querySelector('.photo-grid__image').addEventListener('click', () => {
    openPopup(popupFullPic);
    popupFullPic.querySelector('.popup__image').src = image.src;
    popupFullPic.querySelector('.popup__image').alt = image.alt;
    popupFullPic.querySelector('.popup__title').textContent = image.alt;
  });

  renderCard(cardElement, cardsList);

  closePopup(popupAddPic);

  placeInput.value = '';
  urlInput.value = '';
};

addPicForm.addEventListener('submit', addPicFormSubmit);

// лайки
const likeButton = document.querySelectorAll('.photo-grid__button');
likeButton.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('photo-grid__button_active');
  });
});


// удаление карточки
const trashButton = document.querySelectorAll('.photo-grid__trash');
trashButton.forEach((item) => {
  item.addEventListener('click', () => {
    const listItem = item.closest('.photo-grid__card');
    listItem.remove();
  });
});

//открытие карточки
const cardsImages = document.querySelectorAll('.photo-grid__image');
cardsImages.forEach((item) => {
  item.addEventListener('click', () => {
    openPopup(popupFullPic);
    popupFullPic.querySelector('.popup__image').src = item.src;
    popupFullPic.querySelector('.popup__image').alt = item.alt;
    popupFullPic.querySelector('.popup__title').textContent = item.alt;
  });
});

//закрытие карточки
addFullPicCloseButton.addEventListener('click', () => {
  closePopup(popupFullPic);
});

