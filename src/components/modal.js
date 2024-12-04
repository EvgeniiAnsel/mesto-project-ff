// Открытие попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.remove('popup_is-animated');
  document.addEventListener('keydown', handleEscClose);
}

// Закрытие попапа
export function closePopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Закрытие по нажатию на Esc
function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) closePopup(openPopup);
  }
}

// Закрытие попапа на оверлей
export function closePopupOnOverlayClick(event) {
  if (event.target.classList.contains('popup_is-opened')) {
    closePopup(event.target);
  }
}

export function startPopupProgress(popupElement) {
  const submitButton = popupElement.querySelector(".popup__button");
  const initialText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  return () => {
    submitButton.textContent = initialText;
  };
}