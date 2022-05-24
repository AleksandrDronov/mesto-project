import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._form = document.querySelector(this._selector).querySelector('.form');
    this._inputs = document.querySelector(this._selector).querySelectorAll('.form__item');
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._form.querySelector('.form__button');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(values) {
    this._inputs.forEach(input => {
      input.value = values[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
      this._submitButton.disabled = true;
    }
    else {
      if (this._submitButton.classList.contains('popup__button_create')) {
        this._submitButton.textContent = 'Создать';
      }
      else {
        this._submitButton.textContent = 'Сохранить';
      }
      this._submitButton.disabled = false;
    }
  }
}
