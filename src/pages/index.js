import '../pages/index.css'; // добавьте импорт главного файла сти лей

import { api } from '../components/Api.js';
import {
  profileOpenButton, avatarOpenButton, nameInput, jobInput, profileTitle, profileSubtitle,
  addPicOpenButton, popupDelPic, profileForm, addPicForm, addAvatarForm, settings
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo';
import Popup from '../components/Popup.js'

let userId;

/*function handleCardClick(card) {
  fullPicPopup.open(card);
}*/

const fullPicPopup = new PopupWithImage('.popup_type_full-pic');
fullPicPopup.setEventListeners();
const delPicPopup = new Popup('.popup_type_delete-pic');
delPicPopup.setEventListeners();

const cardsList = new Section({
  renderer: (card) => {
    const newCard = new Card(card, userId, '.card-template', () => { fullPicPopup.open(card)},
    () => { delPicPopup.open() }, () => { delPicPopup.close() }).createCard();
    return newCard;
  }
}, '.photo-grid__list')

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([profileInfo, cards]) => {
    user.setUserInfo(profileInfo);
    userId = profileInfo._id;
    cardsList.renderCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });



const avatarPopup = new PopupWithForm('.popup_type_add-avatar',
function handleSubmitForm(evt, input){
  const submitButton = evt.submitter;
  const nameButton = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';

  api.saveAvatar(input.url)
    .then((result) => {
      user.setUserInfo(result);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = nameButton;
    });
});

avatarPopup.setEventListeners();



const profilePopup = new PopupWithForm('.popup_type_profile',
  function handleSubmitForm(evt, input) {
    const submitButton = evt.submitter;
    const nameButton = submitButton.textContent;

    submitButton.textContent = 'Сохранение...';
    api.saveProfileInfo(input.name, input.job)
      .then((result) => {
        user.setUserInfo(result);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButton.textContent = nameButton;
      });
  });

  profilePopup.setEventListeners();

const addPicPopup = new PopupWithForm('.popup_type_add-pic',
function handleSubmitForm(evt, input){

  const submitButton = evt.submitter;
  const nameButton = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';

  api.saveNewCard(input.place, input.url)
    .then((result) => {
      cardsList.addItem(result);
      addPicPopup.close();

      input.place = '';
      input.url = '';

      const inputList = Array.from(addPicForm.querySelectorAll('.form__item'));
      validate.toggleButtonState(inputList, submitButton);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = nameButton;
    })
});

addPicPopup.setEventListeners();

const user = new UserInfo({
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
  profileAvatar: '.profile__avatar'
})




//попап профиля
profileOpenButton.addEventListener('click', () => {
  profilePopup.open()
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});



//попап аватара
avatarOpenButton.addEventListener('click', () => {
  avatarPopup.open()
});



// попап добавления картинки
addPicOpenButton.addEventListener('click', () => {
  addPicPopup.open()
});

//валидация
const validateProfile = new FormValidator(settings, profileForm);
validateProfile.enableValidation();
const validateAvatar = new FormValidator(settings, addAvatarForm);
validateAvatar.enableValidation();
export const validate = new FormValidator(settings, addPicForm);
validate.enableValidation();
