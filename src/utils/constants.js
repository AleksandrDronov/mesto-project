
const page = document.querySelector('.page');
const profileOpenButton = page.querySelector('.profile__toggle');
const avatarOpenButton = page.querySelector('.profile__avatar-container');
const addPicOpenButton = page.querySelector('.profile__add-button');
const profileForm =  document.forms.profile;
const addPicForm =  document.forms.card;
const addAvatarForm =  document.forms.avatar;
const delPicButton = page.querySelector('.form__button_small');

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
  addPicOpenButton,
  profileForm,
  addPicForm,
  addAvatarForm,
  delPicButton,
  settings
};
