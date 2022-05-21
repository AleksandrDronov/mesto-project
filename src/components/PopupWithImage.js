import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(item) {
    document.querySelector(this._selector).classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupEsc.bind(this));
    const popupImage = document.querySelector(this._selector).querySelector('.popup__image');
    const popupTitle = document.querySelector(this._selector).querySelector('.popup__title');
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupTitle.textContent = item.name;
  }
}
