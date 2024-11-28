import { openPopup } from './modal.js'; // Для открытия попапа с изображением

// Функция создания карточки
export function createCard(item, { handleDelete, handleLike }) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  // Настройка содержимого карточки
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  // Лайк карточки
  cardLikeButton.addEventListener('click', () => handleLike(cardLikeButton));

  // Удаление карточки
  cardDeleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    handleDelete(cardElement);
  });

  // Открытие попапа с картинкой
  cardImage.addEventListener('click', () => openImagePopup(item));

  return cardElement;
}

// Функция для открытия попапа с изображением
export function openImagePopup(item) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageImg = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');

  popupImageImg.src = item.link;
  popupCaption.textContent = item.name;

  openPopup(popupImage);
}
