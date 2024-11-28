// Импортируем функцию для открытия попапа из модального модуля
import { openPopup } from './modal.js';

// Функция для создания карточки
export function createCard(item, { handleDelete, handleLike }) {
  // Шаблон карточки, который мы будем клонировать
  const cardTemplate = document.querySelector('#card-template'); 
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

  // Логирование для проверки
  console.log('Создана карточка с данными:', item);

  // Обработчик события для лайка карточки
  cardLikeButton.addEventListener('click', () => {
    console.log('Лайк карточки:', item.name);
    handleLike(cardLikeButton); // Выполняем функцию для лайка
  });

  // Обработчик события для удаления карточки
  cardDeleteButton.addEventListener('click', () => {
    console.log('Удаление карточки:', cardElement);
    handleDelete(cardElement); // Выполняем функцию для удаления
  });

  // Открытие попапа с изображением при клике на картинку
  cardImage.addEventListener('click', () => {
    console.log('Клик по изображению:', item.link);
    openImagePopup(item); // Открываем попап с изображением
  });

  // Возвращаем готовую карточку
  return cardElement;
}

// Функция для открытия попапа с изображением
export function openImagePopup(item) {
  // Находим попап для изображения
  const popupImage = document.querySelector('.popup_type_image'); 
  const popupImageImg = popupImage.querySelector('.popup__image'); // Изображение внутри попапа
  const popupCaption = popupImage.querySelector('.popup__caption'); // Подпись к изображению

  // Устанавливаем данные для попапа
  popupImageImg.src = item.link; // Устанавливаем ссылку на изображение
  popupImageImg.alt = item.name; // Устанавливаем описание изображения
  popupCaption.textContent = item.name; // Устанавливаем название для подписи

  // Логирование для проверки
  console.log('Открываем изображение:', item.link, 'с подписью:', item.name);

  // Открываем попап с изображением
  openPopup(popupImage); // Открываем попап
}
