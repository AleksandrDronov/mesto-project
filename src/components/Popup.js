export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._handleEscClose = this._closePopupEsc.bind(this);
  }

  _closePopupEsc(evt) {
    if(evt.key === 'Escape') {
      this.close();
    };
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      this._closePopupOverlay(evt);
    });
  }

  _closePopupOverlay(evt) {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__toggle')) {
      this.close();
    };
  }
}
