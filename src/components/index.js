import '../pages/index.css'; // добавьте импорт главного файла сти лей

import { getResponseData, getProfileInfo, getCards, saveProfileInfo, saveNewCard, saveAvatar } from './api.js';
import { profileOpenButton, avatarOpenButton, nameInput, jobInput, profileTitle, profileSubtitle, popupProfile,
  addPicOpenButton, popupAddPic, popupFullPic, popupDelPic, popupAddAva, profileForm, cardsList, addPicForm,
  avatarImage, avatarInput, profileAvatar, settings } from './utils.js';
import { openPopup, closePopup, closePopupOverlay } from './modal.js';
import { createCard, renderCard } from './cards.js';
import { toggleButtonState, enableValidation } from './validate.js';



Promise.all([getProfileInfo(), getCards()])
  .then(([profileInfo, cards]) => {
    profileTitle.textContent = profileInfo.name;
    profileSubtitle.textContent = profileInfo.about;
    profileAvatar.src = profileInfo.avatar;
    const userId = profileInfo._id;
    cards.reverse().forEach((item) => {
      const card = createCard(item.name, item.link, item.owner._id, userId, item._id, item.likes.length, item.likes);
      renderCard(card, cardsList);
    });
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

  saveProfileInfo(nameInput, jobInput)
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

  saveAvatar(avatarInput)
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

  saveNewCard(placeInput, urlInput)
    .then((result) => {
      const cardElement = createCard(result.name, result.link, result.owner._id, result.owner._id, result._id, result.likes.length, result.likes);
      renderCard(cardElement, cardsList);
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
enableValidation(settings);


