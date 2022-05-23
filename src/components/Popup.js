export default class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  _closePopupEsc(evt) {
    if(evt.key === 'Escape') {
      this.close();
    };
  }

  open() {
    document.querySelector(this._selector).classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupEsc.bind(this));
  }

  close() {
    document.querySelector(this._selector).classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupEsc.bind(this));

  }

  setEventListeners() {
    document.querySelector(this._selector).addEventListener('click', (evt) => {
      this._closePopupOverlay(evt);
    });
  }

  _closePopupOverlay(evt) {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__toggle')) {
      this.close();
    };
  }
}
