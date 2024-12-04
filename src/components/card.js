// создание карточки
export function createCard(item, { handleDelete, handleLike, handleImageClick }) {
  const cardTemplate = document.querySelector('#card-template');
  const cardFragment = cardTemplate.content.cloneNode(true);
  const cardElement = cardFragment.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  // данные для карточки
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  // лайк
  cardLikeButton.addEventListener('click', () => handleLike(cardLikeButton));

  // удаление
  cardDeleteButton.addEventListener('click', () => handleDelete(cardElement));

  // клик по изображению для открытия
  cardImage.addEventListener('click', () => handleImageClick(item));

  return cardElement;
}

// обработка лайка
export function handleLike(button) {
  button.classList.toggle('card__like-button_is-active');
}

// обработка удаления
export function handleDelete(card) {
  card.remove();
}
