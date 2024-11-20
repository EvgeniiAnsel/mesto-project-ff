// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// === Константы и переменные ===

// Кнопки управления
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// Попапы
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// Общие элементы
const popupCloseButtons = document.querySelectorAll('.popup__close');

// Формы
const profileForm = popupEditProfile.querySelector('.popup__form');
const newCardForm = popupNewCard.querySelector('.popup__form');

// Поля ввода
const profileNameInput = popupEditProfile.querySelector('input[name="name"]');
const profileDescriptionInput = popupEditProfile.querySelector('input[name="description"]');

// Контейнер для карточек и шаблон
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');

// Профиль пользователя
const profile = {
  name: 'Жак-Ив Кусто',
  description: 'Исследователь океана',
  avatar: './images/avatar.jpg',
};

// Список мест
const places = [...initialCards]; // Сохранить карточки

// === Функции ===

// Открыть попап
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Закрыть попап кликом
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Закрыть попап по нажатию Esc
function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) closePopup(openPopup);
  }
}

// Обновить информацию профиля на странице
function updateProfileInfo() {
  document.querySelector('.profile__title').textContent = profile.name;
  document.querySelector('.profile__description').textContent = profile.description;
  document.querySelector('.profile__image').style.backgroundImage = `url(${profile.avatar})`;
}

// Удалить карточку
function deleteCard(cardElement) {
  cardElement.remove();
}

// Создать карточку
function createCard(item, { deleteCard }) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  // Настройка содержимого карточки
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  // Слушатели событий
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('card__like-button_is-active');
  });

  cardDeleteButton.addEventListener('click', (e) => {
    const cardToDelete = e.target.closest('.card');
    if (cardToDelete) deleteCard(cardToDelete);
  });

  return cardElement;
}

// Добавить карточку в DOM
function addPlaceCard(item) {
  const cardElement = createCard(item, { deleteCard });
  placesList.prepend(cardElement);
}

// === Инициализация ===

// Установка начальной информации профиля
updateProfileInfo();

// Подготовка попапов к закрытию
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    if (popup) closePopup(popup);
  });
});

// Открыть попап редактирования профиля
profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profile.name;
  profileDescriptionInput.value = profile.description;
  openPopup(popupEditProfile);
});

// Сохранить изменения профиля
profileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  profile.name = profileNameInput.value;
  profile.description = profileDescriptionInput.value;

  updateProfileInfo();
  closePopup(popupEditProfile);
});

// Открыть попап добавления нового места
profileAddButton.addEventListener('click', () => openPopup(popupNewCard));

// Добавить новое место
newCardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const placeName = newCardForm.querySelector('input[name="place-name"]').value;
  const placeLink = newCardForm.querySelector('input[name="link"]').value;

  if (placeName && placeLink) {
    const newPlace = { name: placeName, link: placeLink };
    places.push(newPlace);
    addPlaceCard(newPlace);
  }

  closePopup(popupNewCard);
});

// Добавить карточки из массива при загрузке
places.forEach((place) => addPlaceCard(place));
