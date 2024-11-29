// Импортируем функцию для открытия попапа из модального модуля
import { openPopup } from './modal.js';

// Функция для создания карточки
export function createCard(item, { handleDelete, handleLike, handleImageClick }) {
  const cardTemplate = document.querySelector('#card-template'); // Шаблон карточки
  const cardFragment = cardTemplate.content.cloneNode(true); // Клонируем содержимое шаблона
  const cardElement = cardFragment.querySelector('.card'); // Находим корневой элемент карточки
  const cardImage = cardElement.querySelector('.card__image'); // Изображение карточки
  const cardTitle = cardElement.querySelector('.card__title'); // Заголовок карточки
  const cardLikeButton = cardElement.querySelector('.card__like-button'); // Кнопка лайка
  const cardDeleteButton = cardElement.querySelector('.card__delete-button'); // Кнопка удаления

  // Устанавливаем данные для карточки
  cardImage.src = item.link; // Устанавливаем ссылку на изображение
  cardImage.alt = item.name; // Устанавливаем описание изображения
  cardTitle.textContent = item.name; // Устанавливаем название карточки

  // Обработчик лайка
  cardLikeButton.addEventListener('click', () => handleLike(cardLikeButton));

  // Обработчик удаления
  cardDeleteButton.addEventListener('click', () => handleDelete(cardElement));

  // Обработчик клика по изображению карточки для открытия попапа с изображением
  cardImage.addEventListener('click', () => handleImageClick(item));

  // Возвращаем готовую карточку
  return cardElement;
}

// Функция для обработки лайка
export function handleLike(button) {
  button.classList.toggle('card__like-button_is-active'); // Переключаем класс лайка
}

// Функция для обработки удаления
export function handleDelete(card) {
  card.remove(); // Удаляем карточку
}

// Открытие попапа с изображением
export function openImagePopup(item) {
  const popupImage = document.querySelector('.popup_type_image'); // Находим попап изображения
  const popupImageImg = popupImage.querySelector('.popup__image'); // Изображение внутри попапа
  const popupCaption = popupImage.querySelector('.popup__caption'); // Подпись к изображению

  popupImageImg.src = item.link; // Устанавливаем ссылку на изображение
  popupImageImg.alt = item.name; // Устанавливаем описание изображения
  popupCaption.textContent = item.name; // Устанавливаем название для подписи

  openPopup(popupImage); // Открываем попап с изображением
}
