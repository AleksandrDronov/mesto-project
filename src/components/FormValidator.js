export default class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(settings.inputSelector));
    this._submitButton = this._form.querySelector(settings.submitButtonSelector);
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  //показать ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //скрыть ошибки
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //проверка поля на наличие ошибок
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //проверка формы на наличие ошибок
  _isValid() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  //переключение кнопки
  _controlButtonState() {
    if (this._isValid()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', '');
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  //отслеживание изменения состояний
  _setEventListeners() {
    this._controlButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._controlButtonState();
      });
    });
  }

  //сброс формы после закрытия
  resetValidation() {
    this._controlButtonState();
    this._inputList.forEach(input => {
      this._hideInputError(input);
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
};
