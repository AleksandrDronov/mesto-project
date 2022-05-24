import '../pages/index.css'; // добавьте импорт главного файла сти лей

import { api } from '../components/Api.js';
import {
  profileOpenButton, avatarOpenButton, addPicOpenButton, profileForm, addPicForm, addAvatarForm, settings
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo';
import Popup from '../components/Popup.js'

const user = new UserInfo({
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
  profileAvatar: '.profile__avatar'
})

let userId;

//валидация
const validateProfile = new FormValidator(settings, profileForm);
validateProfile.enableValidation();
const validateAvatar = new FormValidator(settings, addAvatarForm);
validateAvatar.enableValidation();
export const validate = new FormValidator(settings, addPicForm);
validate.enableValidation();

//инициализация секции с карточками
const cardsList = new Section({
  renderer: (card) => {
    const newCard = new Card(card, userId, '.card-template', () => { fullPicPopup.open(card)},
    () => { delPicPopup.open() }, () => { delPicPopup.close() }).createCard();
    return newCard;
  }
}, '.photo-grid__list');

//получение информации профиля
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([profileInfo, cards]) => {
    user.setUserInfo(profileInfo);
    userId = profileInfo._id;
    cardsList.renderCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });

//попап с картинкой
const fullPicPopup = new PopupWithImage('.popup_type_full-pic');
fullPicPopup.setEventListeners();

//попап подтверждения удаления
const delPicPopup = new Popup('.popup_type_delete-pic');
delPicPopup.setEventListeners();

//попап редактирования аватара
const avatarPopup = new PopupWithForm('.popup_type_add-avatar',
function handleSubmitForm(input){
  avatarPopup.renderLoading(true);
  api.saveAvatar(input.url)
    .then((result) => {
      user.setUserInfo(result);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});

avatarPopup.setEventListeners();


//открытие попапа аватара
avatarOpenButton.addEventListener('click', () => {
  avatarPopup.open();
  validateAvatar.resetPopup();
});

//попап редактирования профиля
const profilePopup = new PopupWithForm('.popup_type_profile',
  function handleSubmitForm(input) {
    profilePopup.renderLoading(true);
    api.saveProfileInfo(input.name, input.job)
      .then((result) => {
        user.setUserInfo(result);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  });

profilePopup.setEventListeners();

//открытие попапа профиля
profileOpenButton.addEventListener('click', () => {
  profilePopup.open();
  validateProfile.resetPopup();
  profilePopup.setInputValues(user.getUserInfo());
});

//попап добавления карточки
const addPicPopup = new PopupWithForm('.popup_type_add-pic',
function handleSubmitForm(input){
  addPicPopup.renderLoading(true);
  api.saveNewCard(input.place, input.url)
    .then((result) => {
      cardsList.addItem(result);
      addPicPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addPicPopup.renderLoading(false);
    })
});

addPicPopup.setEventListeners();

//открытие попапа добавления картинки
addPicOpenButton.addEventListener('click', () => {
  addPicPopup.open();
  validate.resetPopup();
});


