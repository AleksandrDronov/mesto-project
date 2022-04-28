import '../pages/index.css'; // добавьте импорт главного файла сти лей

import { profileOpenButton, nameInput, jobInput, profileTitle, profileSubtitle, popupProfile, popupCloseButton,
  addPicOpenButton, popupAddPic, popupFullPic, profileForm, initialCards, cardsList, addPicForm, settings } from './utils.js';
import { openPopup, closePopup, closePopupOverlay } from './modal.js';
import { createCard, renderCard } from './cards.js';
import { toggleButtonState, enableValidation } from './validate.js';

//попап профиля
profileOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

popupProfile.addEventListener('click', (evt) => {
  closePopupOverlay(evt, popupProfile);
});

// попап добавления картинки
addPicOpenButton.addEventListener('click', () => {
  openPopup(popupAddPic);
});

popupAddPic.addEventListener('click', (evt) => {
  closePopupOverlay(evt, popupAddPic);
});

//попап картинки
popupFullPic.addEventListener('click', (evt) => {
  closePopupOverlay(evt, popupFullPic);
});

//submit профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
};

profileForm.addEventListener('submit', submitProfileForm);

//добавление карточки из коробки
initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  renderCard(card, cardsList);
});

//submit карточки
function addPicFormSubmit(evt) {
  evt.preventDefault();
  const placeInput = addPicForm.elements.place;
  const urlInput = addPicForm.elements.url;
  const cardElement = createCard(placeInput.value, urlInput.value);

  renderCard(cardElement, cardsList);
  closePopup(popupAddPic);

  placeInput.value = '';
  urlInput.value = '';

  const inputList = Array.from(addPicForm.querySelectorAll('.form__item'));
  const buttonElement = addPicForm.querySelector('.form__button');
  toggleButtonState(inputList, buttonElement, settings);
};

addPicForm.addEventListener('submit', addPicFormSubmit);

//валидация
enableValidation(settings);


