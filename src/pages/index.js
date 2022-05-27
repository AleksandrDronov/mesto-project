import '../pages/index.css'; // добавьте импорт главного файла сти лей

import { api } from '../components/Api.js';
import {
  profileOpenButton, avatarOpenButton, addPicOpenButton, profileForm, addPicForm, addAvatarForm, delPicButton, settings
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import UserInfo from '../components/UserInfo.js';

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
const validate = new FormValidator(settings, addPicForm);
validate.enableValidation();

//инициализация секции с карточками
const cardsList = new Section({
  renderer: (card) => {
    const newCard = new Card(card, userId, '.card-template', () => { fullPicPopup.open(card)},
    (id, card) => { delPicPopup.open(id, card) }, api).createCard();
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
const delPicPopup = new PopupDelete('.popup_type_delete-pic', function handleFormSubmit(){
  api.deleteCard(delPicPopup._id)
    .then(() => {
      delPicPopup._card.remove();
      delPicPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
});
delPicPopup.setEventListeners();

//попап редактирования аватара
const avatarPopup = new PopupWithForm('.popup_type_add-avatar',
function handleSubmitForm(input){
  avatarPopup.renderLoading(true, 'Сохранение...');
  api.saveAvatar(input.url)
    .then((result) => {
      user.setUserInfo(result);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false, 'Сохранить');
    });
});

avatarPopup.setEventListeners();


//открытие попапа аватара
avatarOpenButton.addEventListener('click', () => {
  avatarPopup.open();
  validateAvatar.resetValidation();
});

//попап редактирования профиля
const profilePopup = new PopupWithForm('.popup_type_profile',
  function handleSubmitForm(input) {
    profilePopup.renderLoading(true, 'Сохранение...');
    api.saveProfileInfo(input.name, input.job)
      .then((result) => {
        user.setUserInfo(result);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopup.renderLoading(false, 'Сохранить');
      });
  });

profilePopup.setEventListeners();

//открытие попапа профиля
profileOpenButton.addEventListener('click', () => {
  profilePopup.open();
  validateProfile.resetValidation();
  profilePopup.setInputValues(user.getUserInfo());
});

//попап добавления карточки
const addPicPopup = new PopupWithForm('.popup_type_add-pic',
function handleSubmitForm(input){
  addPicPopup.renderLoading(true, 'Сохранение...');
  api.saveNewCard(input.place, input.url)
    .then((result) => {
      cardsList.addItem(result);
      addPicPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addPicPopup.renderLoading(false, 'Создать');
    })
});

addPicPopup.setEventListeners();

//открытие попапа добавления картинки
addPicOpenButton.addEventListener('click', () => {
  addPicPopup.open();
  validate.resetValidation();
});
