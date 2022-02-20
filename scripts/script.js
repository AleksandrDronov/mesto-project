const page = document.querySelector('.page');
const profileOpenButton = page.querySelector('.profile__toggle');
const popupCloseButton = page.querySelector('.popup__toggle');
const popupProfile = page.querySelector('.popup_type_profile');
const popupAddPic = page.querySelector('.popup_type_add-pic');
const addPicOpenButton = page.querySelector('.profile__add-button');
const addPicCloseButton = popupAddPic.querySelector('.popup__toggle');


const profileForm =  page.querySelector('.form');
const addPicForm =  popupAddPic.querySelector('.form');


function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  nameInput.value = page.querySelector('.profile__title').textContent;
  jobInput.value = page.querySelector('.profile__subtitle').textContent;
};

//попап профиля
profileOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
});
popupCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

// попап добавления картинки
addPicOpenButton.addEventListener('click', () => {
  openPopup(popupAddPic);
});
addPicCloseButton.addEventListener('click', () => {
  closePopup(popupAddPic);
});


//submit профиля
const nameInput = profileForm.querySelector('.form__item_name');
const jobInput = profileForm.querySelector('.form__item_job');

function formSubmitHandler(evt) {
  evt.preventDefault();
  page.querySelector('.profile__title').textContent = nameInput.value;
  page.querySelector('.profile__subtitle').textContent = jobInput.value;
  closePopup(popupProfile);
}

profileForm.addEventListener('submit', formSubmitHandler);

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

  const cardsList = page.querySelector('.photo-grid__list');
  const cardTemplate = page.querySelector('.card-template').content;

  initialCards.forEach((item) => {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.photo-grid__image').src = item.link;
    cardElement.querySelector('.photo-grid__image').alt = item.name;
    cardElement.querySelector('.photo-grid__title').textContent = item.name;

    cardsList.append(cardElement);
  });

// submit каточки
  const placeInput = addPicForm.querySelector('.form__item_place');
  const urlInput = addPicForm.querySelector('.form__item_url');

function addPicFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.photo-grid__image').src = urlInput.value;
  cardElement.querySelector('.photo-grid__image').alt = placeInput.value;
  cardElement.querySelector('.photo-grid__title').textContent = placeInput.value;

  cardsList.prepend(cardElement);

  popupAddPic.classList.remove('popup_opened');

}

addPicForm.addEventListener('submit', addPicFormSubmit);

// лайки
const likeButton = document.querySelectorAll('.photo-grid__button');

likeButton.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('photo-grid__button_active');
  });
});

// удаление карточки
const trashButton = document.querySelectorAll('.photo-grid__trash');

trashButton.forEach((item) => {
  item.addEventListener('click', () => {
    const listItem = item.closest('.photo-grid__card');
    listItem.remove();
  });
});

