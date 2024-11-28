// Импортируем необходимые стили и компоненты
import './pages/index.css'; 
import { initialCards } from './components/cards.js'; // Исходные карточки
import { createCard, openImagePopup } from './components/card.js'; // Функции для работы с карточками
import { openPopup, closePopup, closePopupOnOverlayClick } from './components/modal.js'; // Функции для работы с попапами
import logo from './images/logo.svg'; // Логотип через Webpack
import avatar from './images/avatar.jpg'; // Аватар через Webpack

// Устанавливаем логотип на страницу
document.querySelector('.logo').src = logo;

// === Инициализация DOM-элементов ===
// Переменные для кнопок и попапов
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloseButtons = document.querySelectorAll('.popup__close'); // Все кнопки закрытия попапов

// Формы для редактирования профиля и добавления карточек
const profileForm = popupEditProfile.querySelector('.popup__form');
const newCardForm = popupNewCard.querySelector('.popup__form');

// Поля для ввода данных профиля
const profileNameInput = popupEditProfile.querySelector('input[name="name"]');
const profileDescriptionInput = popupEditProfile.querySelector('input[name="description"]');

// Список мест для отображения карточек
const placesList = document.querySelector('.places__list');

// Объект профиля с данными
const profile = {
  name: 'Жак-Ив Кусто', // Имя пользователя
  description: 'Исследователь океана', // Описание
  avatar, // Аватар пользователя
};

// === Функции ===

// Функция обновления информации профиля на странице
function updateProfileInfo() {
  document.querySelector('.profile__title').textContent = profile.name; // Обновление имени
  document.querySelector('.profile__description').textContent = profile.description; // Обновление описания
}

// Функция для добавления карточки в DOM
function addPlaceCard(item) {
  // Создаём карточку и передаем функцию для обработки лайка и удаления
  const cardElement = createCard(item, {
    handleDelete: (card) => card.remove(), // Удаление карточки
    handleLike: (button) => button.classList.toggle('card__like-button_is-active'), // Лайк карточки
  });
  placesList.prepend(cardElement); // Добавляем карточку в начало списка
}

// === Обработчики событий ===

// Обработчик для закрытия попапов при клике на крестик
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup'); // Находим ближайший попап
    closePopup(popup); // Закрываем попап
  });
});

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  // Заполняем форму значениями профиля
  profileNameInput.value = profile.name;
  profileDescriptionInput.value = profile.description;
  openPopup(popupEditProfile); // Открываем попап
});

// Обработчик отправки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  // Получаем новые значения из полей ввода
  const newName = profileNameInput.value;
  const newDescription = profileDescriptionInput.value;

  // Обновляем информацию профиля на странице
  document.querySelector('.profile__title').textContent = newName;
  document.querySelector('.profile__description').textContent = newDescription;

  closePopup(popupEditProfile); // Закрываем попап после изменения
}

// Прикрепляем обработчик отправки формы
profileForm.addEventListener('submit', handleFormSubmit);

// Открытие попапа для добавления новой карточки
profileAddButton.addEventListener('click', () => openPopup(popupNewCard));

// Обработчик отправки формы добавления новой карточки
newCardForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Отменяем стандартное поведение формы

  // Получаем значения с полей ввода карточки
  const placeName = newCardForm.querySelector('input[name="place-name"]').value;
  const placeLink = newCardForm.querySelector('input[name="link"]').value;

  // Проверяем, что введены значения
  if (placeName && placeLink) {
    addPlaceCard({ name: placeName, link: placeLink }); // Добавляем новую карточку
  }

  closePopup(popupNewCard); // Закрываем попап после добавления
  newCardForm.reset(); // Очищаем форму
});

// === Инициализация ===

// Инициализация профиля на странице
updateProfileInfo();

// Закрытие попапов при клике на оверлей
closePopupOnOverlayClick();

// Добавление начальных карточек на страницу
initialCards.forEach(addPlaceCard);
