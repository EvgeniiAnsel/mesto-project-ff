import { handleLike, handleDeleteLike, handleDelete } from './api.js';

// создание карточки
export function createCard(item, { handleImageClick, currentUserId }) {
  const cardTemplate = document.querySelector('#card-template');
  const cardFragment = cardTemplate.content.cloneNode(true);
  const cardElement = cardFragment.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const likeCount = cardElement.querySelector('.card__like-count'); // отображение количества лайков

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
  cardLikeButton.addEventListener('click', () => {
    if (likes.some(like => like._id === currentUserId)) {
      handleDeleteLike(item._id)
        .then((updatedCard) => {
          likes.splice(likes.findIndex(like => like._id === currentUserId), 1);
          likeCount.textContent = likes.length;
          cardLikeButton.classList.remove('card__like-button_is-active');
        })
        .catch((error) => {
          console.error('Ошибка при удалении лайка:', error);
        });
    } else {
      handleLike(item._id)
        .then((updatedCard) => {
          likes.push({ _id: currentUserId });
          likeCount.textContent = likes.length;
          cardLikeButton.classList.add('card__like-button_is-active');
        })
        .catch((error) => {
          console.error('Ошибка при добавлении лайка:', error);
        });
    }
  });

  // Удаление
  if (item.owner._id === currentUserId) {
    cardDeleteButton.classList.remove('card__delete-button_hidden'); // показываем кнопку удаления, если это моя карточка
    cardDeleteButton.addEventListener('click', () => {
      handleDelete(item._id)
        .then(() => {
          cardElement.remove();
        })
        .catch((error) => {
          console.error('Ошибка при удалении карточки:', error);
        });
    });
  } else {
    cardDeleteButton.classList.add('card__delete-button_hidden'); // скрыть кнопку удаления для карточек других пользователей
  }

  // Клик по изображению для открытия
  cardImage.addEventListener('click', () => handleImageClick(item));

  // Айди карточки
  cardElement.setAttribute('data-id', item._id);

  return cardElement;
}

