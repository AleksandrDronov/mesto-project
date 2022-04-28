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
