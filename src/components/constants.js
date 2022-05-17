
const page = document.querySelector('.page');
const profileOpenButton = page.querySelector('.profile__toggle');
const avatarOpenButton = page.querySelector('.profile__avatar-container');
const popupProfile = page.querySelector('.popup_type_profile');
const popupAddPic = page.querySelector('.popup_type_add-pic');
const popupFullPic = page.querySelector('.popup_type_full-pic');
const popupDelPic = page.querySelector('.popup_type_delete-pic');
const popupAddAva = page.querySelector('.popup_type_add-avatar');
const addPicOpenButton = page.querySelector('.profile__add-button');
const profileForm =  document.forms.profile;
const addPicForm =  document.forms.card;
const addAvatarForm =  document.forms.avatar;
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const profileAvatar = page.querySelector('.profile__avatar');
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.job;
const avatarInput = addAvatarForm.elements.url;
const cardsList = page.querySelector('.photo-grid__list');
const cardTemplate = page.querySelector('.card-template').content;
const delPicButton = page.querySelector('.form__button_small');
const avatarImage = page.querySelector('.profile__avatar');
const allFormButtons = page.querySelectorAll('.form__button');

  //для валидация
const settings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};


export { page,
  profileOpenButton,
  avatarOpenButton,
  popupProfile,
  popupAddPic,
  popupFullPic,
  popupDelPic,
  popupAddAva,
  addPicOpenButton,
  profileForm,
  addPicForm,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  nameInput,
  jobInput,
  cardsList,
  cardTemplate,
  settings,
  delPicButton,
  avatarImage,
  avatarInput,
};
