import { cardTemplate, popupFullPic } from "./index.js";
import { openPopup } from "./utils.js";


// функция создания карточки
export function createCard(cardName, cardUrl) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.photo-grid__image').src = cardUrl;
  cardElement.querySelector('.photo-grid__image').alt = cardName;
  cardElement.querySelector('.photo-grid__title').textContent = cardName;

  const likeButton = cardElement.querySelector('.photo-grid__button');
  const trashButton = cardElement.querySelector('.photo-grid__trash');
  const image = cardElement.querySelector('.photo-grid__image');

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('photo-grid__button_active');
  });
  trashButton.addEventListener('click', () => {
    const listItem = trashButton.closest('.photo-grid__card');
    listItem.remove();
  });

  cardElement.querySelector('.photo-grid__image').addEventListener('click', () => {
    openPopup(popupFullPic);
    popupFullPic.querySelector('.popup__image').src = image.src;
    popupFullPic.querySelector('.popup__image').alt = image.alt;
    popupFullPic.querySelector('.popup__title').textContent = image.alt;
  });

  return cardElement;
};

//рендер карточки
export function renderCard(card, container) {
  container.prepend(card);
}
