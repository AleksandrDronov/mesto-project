import { cardTemplate, popupFullPic } from "./utils.js";
import { openPopup } from "./modal.js";


function like(button, elementClass) {
  button.classList.toggle(elementClass);
};

function deleteCard(button, elementClass) {
  const listItem = button.closest(elementClass);
    listItem.remove();
};

// функция создания карточки
export function createCard(cardName, cardUrl) {

  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.photo-grid__image');
  const cardTitle = cardElement.querySelector('.photo-grid__title');
  const likeButton = cardElement.querySelector('.photo-grid__button');
  const trashButton = cardElement.querySelector('.photo-grid__trash');
  const popupImage = popupFullPic.querySelector('.popup__image');
  const popupTitle = popupFullPic.querySelector('.popup__title');


  cardImage.src = cardUrl;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;

  likeButton.addEventListener('click', () => {
    like(likeButton,'photo-grid__button_active');
  });
  trashButton.addEventListener('click', () => {
    deleteCard(trashButton,'.photo-grid__card')
  });

  cardImage.addEventListener('click', () => {
    openPopup(popupFullPic);
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupTitle.textContent = cardImage.alt;
  });

  return cardElement;
};

//рендер карточки
export function renderCard(card, container) {
  container.prepend(card);
}
