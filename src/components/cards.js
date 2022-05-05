import { cardTemplate, popupFullPic, popupDelPic, delPicButton } from "./utils.js";
import { openPopup, closePopup } from "./modal.js";
import { deleteCard, addLikeCard, removeLikeCard } from "./api.js"

//функция лайка
function likeCard(idCard, likeCount, likeButton) {
  if(!likeButton.classList.contains('photo-grid__button_active')) {
    addLikeCard(idCard, likeCount)
      .then((res) => {
        if(res.ok) {
          return res.json()
        };
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        likeCount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLikeCard(idCard, likeCount)
      .then((res) => {
        if(res.ok) {
          return res.json()
        };
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        likeCount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//функция удаления карточки
function delCard (idCard, cardElement) {
  delPicButton.addEventListener('click', () => {
    deleteCard(idCard, cardElement)
      .then((res) => {
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.log(err);
    });
    closePopup(popupDelPic);
  });
};

// функция создания карточки
export function createCard(cardName, cardUrl, ownerId, myId, idCard, likesCard) {

  const cardElement = cardTemplate.querySelector('.photo-grid__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.photo-grid__image');
  const cardTitle = cardElement.querySelector('.photo-grid__title');
  const likeButton = cardElement.querySelector('.photo-grid__button');
  const trashButton = cardElement.querySelector('.photo-grid__trash');
  const likeCount = cardElement.querySelector('.photo-grid__like');

  const popupImage = popupFullPic.querySelector('.popup__image');
  const popupTitle = popupFullPic.querySelector('.popup__title');

  cardImage.src = cardUrl;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;
  likeCount.textContent = likesCard;

  if(ownerId !== myId) {
    trashButton.classList.add('photo-grid__trash_inactive')
  } else {
    trashButton.addEventListener('click', () => {
      openPopup(popupDelPic);
      delCard(idCard, cardElement);
    });
  };

  likeButton.addEventListener('click', () => {
    likeCard(idCard, likeCount, likeButton);
    likeButton.classList.toggle('photo-grid__button_active');
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
