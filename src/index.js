// Импортируем необходимые стили и компоненты
import './pages/index.css';
import { initialCards } from './components/cards.js'; // Исходные карточки
import { createCard, handleLike, handleDelete } from './components/card.js'; // Функции для работы с карточками
import { openPopup, closePopup, closePopupOnOverlayClick } from './components/modal.js'; // Функции для работы с попапами
import logo from './images/logo.svg'; // Логотип через Webpack
import avatar from './images/avatar.jpg'; // Аватар через Webpack

// Устанавливаем логотип на страницу
document.querySelector('.logo').src = logo;

// === Инициализация DOM-элементов ===
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

// Обновление информации профиля
function updateProfileInfo() {
  document.querySelector('.profile__title').textContent = profile.name; // Обновление имени
  document.querySelector('.profile__description').textContent = profile.description; // Обновление описания
}

// Добавление карточки в DOM
function addPlaceCard(item) {
  const cardElement = createCard(item, { 
    handleDelete, // Используем импортированный метод для удаления
    handleLike, // Используем импортированный метод для лайка
    handleImageClick: (item) => { // Передаём функцию обработки клика по изображению
      const popupImage = document.querySelector('.popup_type_image'); // Попап изображения
      const popupImageImg = popupImage.querySelector('.popup__image'); // Изображение внутри попапа
      const popupCaption = popupImage.querySelector('.popup__caption'); // Подпись к изображению

      popupImageImg.src = item.link; // Устанавливаем ссылку на изображение
      popupImageImg.alt = item.name; // Устанавливаем описание изображения
      popupCaption.textContent = item.name; // Устанавливаем название для подписи

      openPopup(popupImage); // Открываем попап с изображением
    },
  }); 
  placesList.prepend(cardElement); // Добавляем карточку в начало списка
}

// === Обработчики событий ===

// Закрытие попапов при клике на крестик
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup'); // Находим ближайший попап
    closePopup(popup); // Закрываем попап
  });
});

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profile.name; // Заполняем поле имени
  profileDescriptionInput.value = profile.description; // Заполняем поле описания
  openPopup(popupEditProfile); // Открываем попап
});

// Обработчик отправки формы редактирования профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Отменяем стандартное поведение

  profile.name = profileNameInput.value; // Обновляем имя
  profile.description = profileDescriptionInput.value; // Обновляем описание
  updateProfileInfo(); // Обновляем информацию на странице
  closePopup(popupEditProfile); // Закрываем попап
});

// Открытие попапа добавления карточки
profileAddButton.addEventListener('click', () => openPopup(popupNewCard));

// Обработчик добавления новой карточки
newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Отменяем стандартное поведение

  const placeName = newCardForm.querySelector('input[name="place-name"]').value;
  const placeLink = newCardForm.querySelector('input[name="link"]').value;

  if (placeName && placeLink) {
    addPlaceCard({ name: placeName, link: placeLink }); // Добавляем карточку
  }

  closePopup(popupNewCard); // Закрываем попап
  newCardForm.reset(); // Сбрасываем форму
});

// === Инициализация ===

// Устанавливаем начальную информацию профиля
updateProfileInfo();

// Устанавливаем слушатель для закрытия попапов при клике на оверлей
document.addEventListener('click', closePopupOnOverlayClick);

// Добавляем начальные карточки
initialCards.forEach(addPlaceCard);
