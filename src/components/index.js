import '../pages/index.css'; // добавьте импорт главного файла сти лей

import { api } from './Api.js';
import {
  profileOpenButton, avatarOpenButton, nameInput, jobInput, profileTitle, profileSubtitle, popupProfile,
  addPicOpenButton, popupAddPic, popupFullPic, popupDelPic, popupAddAva, profileForm, addPicForm, addAvatarForm,
  avatarImage, avatarInput, profileAvatar, settings
} from './constants.js';
// import { openPopup, closePopup, closePopupOverlay } from './modal.js';
import { toggleButtonState } from './validate.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage';

let userId;

const profilePopup = new Popup('.popup_type_profile');
const avatarPopup = new Popup('.popup_type_add-avatar');
const addPicPopup = new Popup('.popup_type_add-pic');
const fullPicPopup = new PopupWithImage('.popup_type_full-pic');

function handleCardClick(name, link) {
  fullPicPopup.open(name, link);
}

const cardsList = new Section({
  renderer: (card) => {
    const newCard = new Card(card, userId, '.card-template', handleCardClick).createCard();
    return newCard;
  }
}, '.photo-grid__list')


Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([profileInfo, cards]) => {
    profileTitle.textContent = profileInfo.name;
    profileSubtitle.textContent = profileInfo.about;
    profileAvatar.src = profileInfo.avatar;
    userId = profileInfo._id;
    cardsList.renderCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });

//попап профиля
profileOpenButton.addEventListener('click', () => {
  profilePopup.open()
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

profilePopup.setEventListeners();

//попап аватара
avatarOpenButton.addEventListener('click', () => {
  avatarPopup.open()
});

avatarPopup.setEventListeners();


// попап добавления картинки
addPicOpenButton.addEventListener('click', () => {
  addPicPopup.open()
});

addPicPopup.setEventListeners();

//попап картинки
fullPicPopup.setEventListeners()

//попап подверждения удаления кратинки
popupDelPic.addEventListener('click', (evt) => {
  closePopupOverlay(evt, popupDelPic);
});


//submit профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const nameButton = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';

  api.saveProfileInfo(nameInput, jobInput)
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
};

profileForm.addEventListener('submit', submitProfileForm);

//submit аватара
function submitAvatarForm(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const nameButton = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';

  api.saveAvatar(avatarInput)
    .then((result) => {
      avatarImage.src = result.avatar;
      closePopup(popupAddAva);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = nameButton;
    });
};

popupAddAva.addEventListener('submit', submitAvatarForm);


//submit карточки
function addPicFormSubmit(evt) {
  evt.preventDefault();

  const placeInput = addPicForm.elements.place;
  const urlInput = addPicForm.elements.url;
  const submitButton = evt.submitter;
  const nameButton = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';

  api.saveNewCard(placeInput, urlInput)
    .then((result) => {
      console.log(result);
      cardsList.addItem(result);
      addPicPopup.close();

      placeInput.value = '';
      urlInput.value = '';

      const inputList = Array.from(addPicForm.querySelectorAll('.form__item'));
      toggleButtonState(inputList, submitButton, settings);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = nameButton;
    })
};

addPicForm.addEventListener('submit', addPicFormSubmit);

//валидация
const validateProfile = new FormValidator(settings, profileForm);
validateProfile.enableValidation();
const validateAvatar = new FormValidator(settings, addAvatarForm);
validateAvatar.enableValidation();
const validate = new FormValidator(settings, addPicForm);
validate.enableValidation();


