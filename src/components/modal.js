import { profileTitle, profileSubtitle, popupProfile, popupAddPic, addPicForm, nameInput, jobInput, cardsList } from "./index.js";
import { closePopup } from "./utils.js";
import { renderCard, createCard } from "./cards.js";


//submit профиля
export function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
};

// submit карточки
export function addPicFormSubmit(evt) {
  evt.preventDefault();
  const placeInput = addPicForm.elements.place;
  const urlInput = addPicForm.elements.url;

  const cardElement = createCard(placeInput.value, urlInput.value);

  renderCard(cardElement, cardsList);

  closePopup(popupAddPic);

  placeInput.value = '';
  urlInput.value = '';
};
