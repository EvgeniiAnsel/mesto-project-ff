// создание карточки
import { config } from './api.js';
export function createCard(item, { handleDelete, handleLike, handleImageClick }) {
  const cardTemplate = document.querySelector('#card-template');
  const cardFragment = cardTemplate.content.cloneNode(true);
  const cardElement = cardFragment.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const likeCount = cardElement.querySelector('.card__like-count'); // отображение количества лайков

  // Проверка на наличие данных для изображения и имени
  if (!item.link || !item.name) {
    console.error("Ошибка: Некорректные данные для карточки", item);
    return; // Завершаем выполнение функции, если данных недостаточно
  }

  // Данные для карточки
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  // Проверка на наличие массива лайков
  const likes = Array.isArray(item.likes) ? item.likes : [];
  likeCount.textContent = likes.length; // отобразить количество лайков

  // Лайк
  cardLikeButton.addEventListener('click', () => handleLike(cardLikeButton, item));

  // Удаление
  cardDeleteButton.addEventListener('click', () => handleDelete(cardElement));

  // Клик по изображению для открытия
  cardImage.addEventListener('click', () => handleImageClick(item));

  // Айди карточки
  cardElement.setAttribute('data-id', item._id);

  return cardElement;
}

// обработка лайка
export function handleLike(button, item) {
  // проверка был ли лайк
  const method = button.classList.contains('card__like-button_is-active') ? 'DELETE' : 'PUT';

  fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
    method: method,
    headers: {
      'Authorization': config.headers.authorization,
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .then(updatedCard => {
    // Проверяем, что обновленный объект содержит правильную информацию о лайках
    if (updatedCard && Array.isArray(updatedCard.likes)) {
      // обновление количества лайков
      const likeCount = button.closest('.card').querySelector('.card__like-count');
      likeCount.textContent = updatedCard.likes.length;
    
      // изменение состояния кнопки лайка
      button.classList.toggle('card__like-button_is-active');
    
      // обновляем информацию о лайках в исходных данных
      item.likes = updatedCard.likes;
    } else {
      console.error('Ошибка: Обновленные данные карточки не содержат массива лайков', updatedCard);
    }
  })
  .catch(error => {
    console.error('Ошибка лайка', error);
  });
}


// обработка удаления
export function handleDelete(card) {
  card.remove();
}
