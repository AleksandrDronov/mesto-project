import { cardTemplate, popupFullPic, popupDelPic, delPicButton } from "./utils.js";
import { openPopup, closePopup } from "./modal.js";
import { getResponseData, deleteCard, addLikeCard, removeLikeCard } from "./api.js"

//функция лайка
function likeCardElement(data, likeCount, likeButton) {
  likeCount.textContent = data.likes.length;
  likeButton.classList.toggle('photo-grid__button_active');
};

function checkMyLike(myId, likes) {
  return likes.some((like) => {
    return like._id === myId;
  });
};

function likeCard(idCard, likeCount, likeButton) {
  if(!likeButton.classList.contains('photo-grid__button_active')) {
    addLikeCard(idCard)
      .then(getResponseData)
      .then((result) => {
        likeCardElement(result, likeCount, likeButton);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLikeCard(idCard)
      .then(getResponseData)
      .then((result) => {
        likeCardElement(result, likeCount, likeButton);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//функция удаления карточки
function deleteCardElement(cardElement) {
  cardElement.remove();
};

function delCard (idCard, cardElement) {
  delPicButton.addEventListener('click', () => {
    deleteCard(idCard)
      .then(getResponseData)
      .then(() => {
        deleteCardElement(cardElement);
      })
      .catch((err) => {
        console.log(err);
    });
    closePopup(popupDelPic);
  });
};

// функция создания карточки
export function createCard(cardName, cardUrl, ownerId, myId, idCard, likesCard, likes) {

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

  if(checkMyLike(myId, likes)) {
    likeButton.classList.toggle('photo-grid__button_active');
  };

  likeButton.addEventListener('click', () => {
    likeCard(idCard, likeCount, likeButton);
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
