import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = document.querySelector(this._selector).querySelector('.popup__image');
    this._popupTitle = document.querySelector(this._selector).querySelector('.popup__title');
  }

  open(item) {
    super.open();
    this._popupImage.src = item.link;
    this._popupImage.alt = item.name;
    this._popupTitle.textContent = item.name;
  }
}
