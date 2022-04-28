
function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

export function closePopupOverlay(evt, popup) {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__toggle')) {
    closePopup(popup);
  };
}
