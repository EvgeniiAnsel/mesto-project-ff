// Открытие попапа
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
    document.addEventListener('keydown', handleEscClose);
  }
  
  // Закрытие попапа
  export function closePopup(popup) {
    popup.classList.add('popup_is-animated');  // Для плавного закрытия
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
  }
  
  // Закрытие попапа по нажатию на клавишу Esc
  function handleEscClose(event) {
    if (event.key === 'Escape') {
      const openPopup = document.querySelector('.popup_is-opened');
      if (openPopup) closePopup(openPopup);
    }
  }
  
// Закрытие попапа при клике на оверлей
export function closePopupOnOverlayClick() {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup_is-opened')) {
      closePopup(event.target);
    }
  });
}