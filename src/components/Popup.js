export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  _closePopupEsc(evt) {
    if(evt.key === 'Escape') {
      this._close();
    };
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupEsc.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupEsc.bind(this));
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      this.closePopupOverlay(evt);
    });
  }

  closePopupOverlay(evt) {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__toggle')) {
      this._close();
    };
  }
}
