import '../pages/index.css'; // добавьте импорт главного файла сти лей

import { api } from './Api.js';
import {
  profileOpenButton, avatarOpenButton, nameInput, jobInput, profileTitle, profileSubtitle, popupProfile,
  addPicOpenButton, popupAddPic, popupFullPic, popupDelPic, popupAddAva, profileForm, addPicForm,
  avatarImage, avatarInput, profileAvatar, settings
} from './constants.js';
import { openPopup, closePopup, closePopupOverlay } from './modal.js';
import { toggleButtonState } from './validate.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';

const cardsList = new Section({
  items: api.getCards(),
  userId: api.getProfileInfo(),
  renderer: (item) => {
    const card = new Card(item, userId, '.photo-grid__card');
    const cardElement = card.createCard();
    cardsList.addItem(cardElement);
  }
}, '.photo-grid__list');

Promise.all([api.getProfileInfo(), /*api.getCards()*/])
  .then(([profileInfo, cards]) => {
    profileTitle.textContent = profileInfo.name;
    profileSubtitle.textContent = profileInfo.about;
    profileAvatar.src = profileInfo.avatar;
    const userId = profileInfo._id;
   // cards.reverse().forEach((item) => {
     // renderItem(item, userId);
   // });
  })
  .catch((err) => {
    console.log(err);
  });


//попап профиля
profileOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});
popupProfile.addEventListener('click', (evt) => {
  closePopupOverlay(evt, popupProfile);
});

//попап аватара
avatarOpenButton.addEventListener('click', () => {
  openPopup(popupAddAva);
});
popupAddAva.addEventListener('click', (evt) => {
  closePopupOverlay(evt, popupAddAva);
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
      const cardElement = new Card(result, result._id, '.photo-grid__card');
      cardElement.createCard();
      cardElement.renderCard(cardElement, cardsList);
      closePopup(popupAddPic);

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
const validate = new FormValidator(settings, addPicForm);
validate.enableValidation();


