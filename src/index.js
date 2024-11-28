import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, openImagePopup } from './components/card.js';
import { openPopup, closePopup, closePopupOnOverlayClick } from './components/modal.js';

// === Инициализация DOM-элементов ===
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const profileForm = popupEditProfile.querySelector('.popup__form');
const newCardForm = popupNewCard.querySelector('.popup__form');
const profileNameInput = popupEditProfile.querySelector('input[name="name"]');
const profileDescriptionInput = popupEditProfile.querySelector('input[name="description"]');
const placesList = document.querySelector('.places__list');
const profile = {
  name: 'Жак-Ив Кусто',
  description: 'Исследователь океана',
  avatar: './images/avatar.jpg',
};

// === Функции ===
function updateProfileInfo() {
  document.querySelector('.profile__title').textContent = profile.name;
  document.querySelector('.profile__description').textContent = profile.description;
}

// Добавить карточку в DOM
function addPlaceCard(item) {
  const cardElement = createCard(item, {
    handleDelete: (card) => card.remove(),
    handleLike: (button) => button.classList.toggle('card__like-button_is-active'),
  });
  placesList.prepend(cardElement);
}

// === Обработчики событий ===
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profile.name;
  profileDescriptionInput.value = profile.description;
  openPopup(popupEditProfile);
});

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profile.name = profileNameInput.value;
  profile.description = profileDescriptionInput.value;
  updateProfileInfo();
  closePopup(popupEditProfile);
});

profileAddButton.addEventListener('click', () => openPopup(popupNewCard));

newCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const placeName = newCardForm.querySelector('input[name="place-name"]').value;
  const placeLink = newCardForm.querySelector('input[name="link"]').value;
  if (placeName && placeLink) {
    addPlaceCard({ name: placeName, link: placeLink });
  }
  closePopup(popupNewCard);
  newCardForm.reset();
});

// === Инициализация ===
updateProfileInfo();
closePopupOnOverlayClick();
initialCards.forEach(addPlaceCard);
