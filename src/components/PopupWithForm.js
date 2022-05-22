import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._form = document.querySelector(this._selector).querySelector('.form');
    this._inputs = document.querySelector(this._selector).querySelectorAll('.form__item');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues(){
    this._inputValues = {};
    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(evt, this._getInputValues());
    });
  }

  close(){
    super.close();
    this._form.reset();
  }
}
