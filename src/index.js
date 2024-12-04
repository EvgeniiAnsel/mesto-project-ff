// Импорт
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, handleLike, handleDelete } from './components/card.js';
import { openPopup, closePopup, closePopupOnOverlayClick } from './components/modal.js';
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';
import { enableValidation, clearValidation } from './components/validation.js';

// Логотип
document.querySelector('.logo').src = logo;

// Инициализация DOM
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloseButtons = document.querySelectorAll('.popup__close');

// Формы для редактирования профиля и добавления карточек
const profileForm = popupEditProfile.querySelector('.popup__form');
const newCardForm = popupNewCard.querySelector('.popup__form');

// Поля ввода данных профиля
const profileNameInput = popupEditProfile.querySelector('input[name="name"]');
const profileDescriptionInput = popupEditProfile.querySelector('input[name="description"]');

// Список мест для отображения карточек
const placesList = document.querySelector('.places__list');

// Профиль с данными
const profile = {
  name: 'Жак-Ив Кусто',
  description: 'Исследователь океана',
  avatar,
};

// Функции

// Обновление информации профиля
function updateProfileInfo() {
  document.querySelector('.profile__title').textContent = profile.name;
  document.querySelector('.profile__description').textContent = profile.description;
}

// Добавление карточки в DOM
function addPlaceCard(item) {
  const cardElement = createCard(item, {
    handleDelete,
    handleLike,
    handleImageClick: (item) => {
      const popupImage = document.querySelector('.popup_type_image');
      const popupImageImg = popupImage.querySelector('.popup__image');
      const popupCaption = popupImage.querySelector('.popup__caption');

      popupImageImg.src = item.link;
      popupImageImg.alt = item.name;
      popupCaption.textContent = item.name;

      openPopup(popupImage);
    },
  });
  placesList.prepend(cardElement);
}

// Обработчики

// Закрытие попапов при клике на крестик
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profile.name;
  profileDescriptionInput.value = profile.description;
  clearValidation(profileForm, validationConfig);
  openPopup(popupEditProfile);
});

// Обработчик отправки формы редактирования профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profile.name = profileNameInput.value;
  profile.description = profileDescriptionInput.value;
  updateProfileInfo();
  closePopup(popupEditProfile);
});

// Открытие попапа добавления карточки
profileAddButton.addEventListener('click', () => openPopup(popupNewCard));

// Обработчик добавления новой карточки
newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const placeName = newCardForm.querySelector('input[name="place-name"]').value;
  const placeLink = newCardForm.querySelector('input[name="link"]').value;

  if (placeName && placeLink) {
    addPlaceCard({ name: placeName, link: placeLink });
  }

  closePopup(popupNewCard);
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
});

// Старт

// начальная информацию профиля
updateProfileInfo();

// слушатель на оверлей
document.addEventListener('click', closePopupOnOverlayClick);

// начальные карточки
initialCards.forEach(addPlaceCard);

// валидация
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);
