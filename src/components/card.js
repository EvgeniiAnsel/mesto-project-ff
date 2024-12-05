import { config } from './api.js';

// создание карточки
export function createCard(item, { handleDelete, handleLike, handleImageClick, currentUserId }) {
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
    return;
  }

  // Данные карточки
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  // массив лайков
  const likes = Array.isArray(item.likes) ? item.likes : [];
  likeCount.textContent = likes.length; // отобразить количество лайков

  // Проверка, есть ли лайк у текущего пользователя
  if (likes.some(like => like._id === currentUserId)) {
    cardLikeButton.classList.add('card__like-button_is-active'); // если лайк поставлен, добавляем активный класс
  }

  // Лайк
  cardLikeButton.addEventListener('click', () => handleLike(cardLikeButton, item));

  // Удаление
  if (item.owner._id === currentUserId) {
    cardDeleteButton.addEventListener('click', () => handleDelete(cardElement, item)); // показать кнопку удаления только если это моя карточка
  } else {
    cardDeleteButton.style.display = 'none'; // скрыть кнопку удаления для карточек других пользователей
  }

  // Клик по изображению для открытия
  cardImage.addEventListener('click', () => handleImageClick(item));

  // Айди карточки
  cardElement.setAttribute('data-id', item._id);

  return cardElement;
}


// обработка лайка
export function handleLike(button, item) {
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
    if (updatedCard && Array.isArray(updatedCard.likes)) {
      // Обновление количества лайков
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
export function handleDelete(cardElement, item) {
  const cardId = item._id; // Получаем ID карточки

  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': config.headers.authorization,
      'Content-Type': 'application/json',
    },
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    cardElement.remove();
  })
  .catch((error) => {
    console.error('Ошибка при удалении карточки', error);
  });
}
