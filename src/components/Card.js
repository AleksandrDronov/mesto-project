import { delPicButton } from "../utils/constants.js";
import {api} from "./Api.js"

export default class Card {
  constructor(card, userId, selector, handleCardClick, handleDelButtonClick, handleDelPoupClose) {
    this._cardName = card.name;
    this._cardUrl = card.link;
    this._ownerId = card.owner._id;
    this._myId = userId;
    this._idCard = card._id;
    this._likesCard = card.likes.length;
    this._likes = card.likes;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDelButtonClick = handleDelButtonClick;
    this._handleDelPoupClose = handleDelPoupClose;
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
        this._handleDelButtonClick()
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
      this._handleCardClick();
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
          this._handleDelPoupClose()    ;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
