// Открытие попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Закрытие попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Закрытие попапа по нажатию на Esc
function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) closePopup(openPopup);
  }
}

// Закрытие попапа по клику на оверлей
export function closePopupOnOverlayClick(event) {
  if (event.target.classList.contains('popup_is-opened')) {
    closePopup(event.target);
  }
}

// Инициализация анимации при загрузке страницы
export function initPopupAnimations() {
  const allPopups = document.querySelectorAll('.popup');
  allPopups.forEach(popup => {
    if (!popup.classList.contains('popup_is-animated')) {
      popup.classList.add('popup_is-animated');
    }
  });
}
