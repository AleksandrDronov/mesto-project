import { cardTemplate, popupFullPic } from "./index.js";
import { openPopup } from "./utils.js";


// функция создания карточки
export function createCard(cardName, cardUrl) {

  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.photo-grid__image');
  const cardTitle = cardElement.querySelector('.photo-grid__title');
  const likeButton = cardElement.querySelector('.photo-grid__button');
  const trashButton = cardElement.querySelector('.photo-grid__trash');

  cardImage.src = cardUrl;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('photo-grid__button_active');
  });
  trashButton.addEventListener('click', () => {
    const listItem = trashButton.closest('.photo-grid__card');
    listItem.remove();
  });

  cardImage.addEventListener('click', () => {
    openPopup(popupFullPic);
    popupFullPic.querySelector('.popup__image').src = cardImage.src;
    popupFullPic.querySelector('.popup__image').alt = cardImage.alt;
    popupFullPic.querySelector('.popup__title').textContent = cardImage.alt;
  });

  return cardElement;
};

//рендер карточки
export function renderCard(card, container) {
  container.prepend(card);
}
