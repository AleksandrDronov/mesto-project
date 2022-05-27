export default class Card {
  constructor(card, userId, selector, handleCardClick, handleDelButtonClick, api) {
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
    this._api = api;
    this._element = this._getElement();
    this._cardImage = this._element.querySelector('.photo-grid__image');
    this._cardTitle = this._element.querySelector('.photo-grid__title');
    this._likeButton = this._element.querySelector('.photo-grid__button');
    this._trashButton = this._element.querySelector('.photo-grid__trash');
    this._likeCount = this._element.querySelector('.photo-grid__like');
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

  _setEventListeners() {

    if (this._ownerId !== this._myId) {
      this._trashButton.classList.add('photo-grid__trash_inactive')
    } else {
      this._trashButton.addEventListener('click', () => {
        this._handleDelButtonClick(this._idCard, this._element);
      });
    };

    this._likeButton.addEventListener('click', () => {
      this._likeCard(this._likeCount, this._likeButton);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  createCard() {
    this._cardImage.src = this._cardUrl;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;
    this._likeCount.textContent = this._likesCard;

    this._setEventListeners();

    return this._element;
  }

  _likeCardElement(data) {
    this._likeCount.textContent = data.likes.length;
    this._likeButton.classList.toggle('photo-grid__button_active');
  }

  _likeCard(likeCount, likeButton) {
    if (!likeButton.classList.contains('photo-grid__button_active')) {
      this._api.addLikeCard(this._idCard)
        .then((result) => {
          this._likeCardElement(result, likeCount, likeButton);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api.removeLikeCard(this._idCard)
        .then((result) => {
          this._likeCardElement(result, likeCount, likeButton);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
}
