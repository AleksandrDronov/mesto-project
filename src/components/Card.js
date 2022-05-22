import { cardTemplate, popupFullPic, popupDelPic, delPicButton } from "./constants.js";
import { openPopup, closePopup } from "./modal.js";
import {api} from "./Api.js"
import PopupWithImage from "./PopupWithImage.js";

//функция лайка
/*function likeCardElement(data, likeCount, likeButton) {
  likeCount.textContent = data.likes.length;
  likeButton.classList.toggle('photo-grid__button_active');
};*/

/*function checkMyLike(myId, likes) {
  return likes.some((like) => {
    return like._id === myId;
  });
};*/

/*function likeCard(idCard, likeCount, likeButton) {
  if(!likeButton.classList.contains('photo-grid__button_active')) {
    addLikeCard(idCard)
      .then((result) => {
        likeCardElement(result, likeCount, likeButton);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLikeCard(idCard)
      .then((result) => {
        likeCardElement(result, likeCount, likeButton);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};*/

//функция удаления карточки
/*function deleteCardElement(cardElement) {
  cardElement.remove();
};

function delCard (idCard, cardElement) {
  delPicButton.addEventListener('click', () => {
    deleteCard(idCard)
      .then(() => {
        deleteCardElement(cardElement);
        closePopup(popupDelPic);
      })
      .catch((err) => {
        console.log(err);
    });
  });
};*/

// функция создания карточки
/*export function createCard(cardName, cardUrl, ownerId, myId, idCard, likesCard, likes) {

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
};*/

//рендер карточки
/*export function renderCard(card, container) {
  container.prepend(card);
}*/

export default class Card {
  constructor(card, userId, selector, handleCardClick) {
    this._cardName = card.name;
    this._cardUrl = card.link;
    this._ownerId = card.owner._id;
    this._myId = userId;
    this._idCard = card._id;
    this._likesCard = card.likes.length;
    this._likes = card.likes;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.photo-grid__card')
      .cloneNode(true);

    return cardElement;
  }

  renderCard(card, container) {
    container.prepend(card);
  }

  _checkMyLike() {
    return this._likes.some((like) => {
      return like._id === this._myId;
    });
  }

  createCard() {
    this._element = this._getElement();
    const cardImage = this._element.querySelector('.photo-grid__image');
    const cardTitle = this._element.querySelector('.photo-grid__title');
    const likeButton = this._element.querySelector('.photo-grid__button');
    const trashButton = this._element.querySelector('.photo-grid__trash');
    const likeCount = this._element.querySelector('.photo-grid__like');

    cardImage.src = this._cardUrl;
    cardImage.alt = this._cardName;
    cardTitle.textContent = this._cardName;
    likeCount.textContent = this._likesCard;

    if (this._ownerId !== this._myId) {
      trashButton.classList.add('photo-grid__trash_inactive')
    } else {
      trashButton.addEventListener('click', () => {
        openPopup(popupDelPic);
        this._delCard();
      });
    };

    if (this._checkMyLike()) {
      likeButton.classList.toggle('photo-grid__button_active');
    };

    likeButton.addEventListener('click', () => {
      this._likeCard(likeCount, likeButton);
    });

    cardImage.addEventListener('click', () => {
      this._handleCardClick(this._element);
    });

    return this._element;
  }

  _likeCardElement(data, likeCount, likeButton) {
    likeCount.textContent = data.likes.length;
    likeButton.classList.toggle('photo-grid__button_active');
  }

  _likeCard(likeCount, likeButton) {
    if (!likeButton.classList.contains('photo-grid__button_active')) {
      api.addLikeCard(this._idCard)
        .then((result) => {
          this._likeCardElement(result, likeCount, likeButton);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.removeLikeCard(this._idCard)
        .then((result) => {
          this._likeCardElement(result, likeCount, likeButton);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  _deleteCardElement() {
    this._element.remove();
  }

  _delCard() {
    delPicButton.addEventListener('click', () => {
      api.deleteCard(this._idCard)
        .then(() => {
          this._deleteCardElement();
          closePopup(popupDelPic);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
