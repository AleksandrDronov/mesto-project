import '../pages/index.css'; // добавьте импорт главного файла стилей

import { openPopup, closePopup } from './utils.js';
import { submitProfileForm, addPicFormSubmit } from './modal.js';
import { createCard, renderCard } from './cards.js';
import { enableValidation } from './validate.js';

const page = document.querySelector('.page');
const profileOpenButton = page.querySelector('.profile__toggle');
const popupCloseButton = page.querySelector('.popup__toggle');
const popupProfile = page.querySelector('.popup_type_profile');
const popupAddPic = page.querySelector('.popup_type_add-pic');
const popupFullPic = page.querySelector('.popup_type_full-pic');
const addPicOpenButton = page.querySelector('.profile__add-button');
const addPicCloseButton = popupAddPic.querySelector('.popup__toggle');
const addFullPicCloseButton = popupFullPic.querySelector('.popup__toggle');
const profileForm =  document.forms.profile;
const addPicForm =  document.forms.card;
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.job;
const cardsList = page.querySelector('.photo-grid__list');
const cardTemplate = page.querySelector('.card-template').content;

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

//валидация
const settings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

//попап профиля
profileOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

popupProfile.addEventListener('click', (evt) => {
  if(evt.target === popupCloseButton || evt.target === popupProfile) {
    closePopup(popupProfile);
  };
});

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    closePopup(popupProfile);
    closePopup(popupAddPic);
    closePopup(popupFullPic);
  };
});

// попап добавления картинки
addPicOpenButton.addEventListener('click', () => {
  openPopup(popupAddPic);
});

popupAddPic.addEventListener('click', (evt) => {
  if(evt.target === addPicCloseButton || evt.target === popupAddPic) {
    closePopup(popupAddPic);
  };
});

//попап картинки
popupFullPic.addEventListener('click', (evt) => {
  if(evt.target === addFullPicCloseButton || evt.target === popupFullPic) {
    closePopup(popupFullPic);
  };
});

//submit профиля
profileForm.addEventListener('submit', submitProfileForm);

//добавление карточки из коробки
initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  renderCard(card, cardsList);
});

//submit карточки
addPicForm.addEventListener('submit', addPicFormSubmit);

//валидация
enableValidation(settings);



  export { page,
    profileOpenButton,
    popupCloseButton,
    popupProfile,
    popupAddPic,
    popupFullPic,
    addPicOpenButton,
    addPicCloseButton,
    addFullPicCloseButton,
    profileForm,
    addPicForm,
    profileTitle,
    profileSubtitle,
    nameInput,
    jobInput,
    cardsList,
    cardTemplate,
    initialCards,
    settings
  };
