import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._delButton = this._popup.querySelector('.form__button');
  }

  setEventListeners(){
    super.setEventListeners();
    this._delButton.addEventListener('click', this._handleFormSubmit);
  }

  open(id, card){
    super.open();
    this.id = id;
    this.card = card;
  }
}
