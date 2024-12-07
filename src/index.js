import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import logo from './images/logo.svg';
import { enableValidation, clearValidation } from './components/validation.js';
import { getAllCards, getUserProfile, updateProfile, addCard, updateAvatar } from './components/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Логотип
document.querySelector('.logo').src = logo;

// Инициализация DOM
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const popupCloseButtons = document.querySelectorAll('.popup__close');

// Формы
const profileForm = popupEditProfile.querySelector('.popup__form');
const newCardForm = popupNewCard.querySelector('.popup__form');
const newAvatarForm = popupNewAvatar.querySelector('.popup__form');

// Поля ввода
const profileNameInput = popupEditProfile.querySelector('input[name="name"]');
const profileDescriptionInput = popupEditProfile.querySelector('input[name="description"]');
const avatarInput = newAvatarForm.querySelector('input[name="avatar-link"]');

// Список карточек
const placesList = document.querySelector('.places__list');

// Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

// Элементы попапа изображения
const popupImage = document.querySelector('.popup_type_image');
const popupImageImg = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

// Функция открытия попапа изображения
const openImagePopup = (card) => {
  popupImageImg.src = card.link;
  popupImageImg.alt = card.name;
  popupCaption.textContent = card.name;
  openPopup(popupImage);
};

// Установка слушателей для закрытия по клику на оверлей
const enableOverlayClickClose = (popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
};

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  enableOverlayClickClose(popup);
});

let currentUserId = '';

Promise.all([getUserProfile(), getAllCards()])
  .then(([myProfile, cardArray]) => {
    currentUserId = myProfile._id;

      profileTitle.textContent = myProfile.name;
      profileDescription.textContent = myProfile.about;
      profileAvatar.style.backgroundImage = `url(${myProfile.avatar})`;

    // Построенпие карточек
    placesList.innerHTML = '';
    cardArray.forEach((card) => {
      const cardElement = createCard(card, {
        handleImageClick: openImagePopup,
        currentUserId,
      });
      placesList.append(cardElement);
    });
  })
  .catch((error) => {
    console.error('Ошибка при получении данных пользователя или карточек', error);
  });

// обработчики
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

profileAddButton.addEventListener('click', () => {
  newCardForm.reset(); // сброс формы
  clearValidation(newCardForm, validationConfig); // очистка ошибок

  openPopup(popupNewCard);
});

// обработчик для формы добавления карточки
newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  // данные из формы
  const placeNameInput = newCardForm.querySelector('input[name="place-name"]');
  const placeLinkInput = newCardForm.querySelector('input[name="link"]');

  // состояние загрузки
  setButtonState (true, popupNewCard);

  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;

  // карточка через API
  addCard(placeName, placeLink)
    .then((newCardData) => {
      const newCard = createCard(newCardData, {
        handleImageClick: openImagePopup,
        currentUserId
      } );
      placesList.append(newCard);
      closePopup(popupNewCard);
      newCardForm.reset();
    })
    .catch((error) => {
      console.error('Ошибка при добавлении карточки на сервер', error);
    })
    .finally(() => {
      setButtonState(false, popupNewCard);
    });
});

profileAvatar.addEventListener('click', () => {
  newAvatarForm.reset(); // сброс формы
  clearValidation(newAvatarForm, validationConfig); // очистка ошибок

  openPopup(popupNewAvatar);
});

newAvatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const avatarLink = avatarInput.value;
  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);

  setButtonState (true, popupNewAvatar);

  updateAvatar(avatarLink)
    .then(() => {
      profileAvatar.style.backgroundImage = `url(${avatarLink})`;
      closePopup(popupNewAvatar);
      newAvatarForm.reset();
    })
    .catch((error) => {
      console.error('Ошибка при обновлении аватара', error);
    })
    .finally(() => {
      setButtonState(false, popupNewAvatar);
    });
});

// обработчик открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  // заполняем форму из сохраненных данных
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationConfig); // очистка ошибок валидации
  openPopup(popupEditProfile);
});

function setButtonState(status, popup ) { 
  const btn = popup.querySelector (`.popup__button`);
  if (status === true) {btn.textContent = `Сохранение...`}
  else {btn.textContent = `Сохранить`};
}

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;
  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);

  setButtonState (true, popupEditProfile);

  updateProfile(name, description)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEditProfile);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении профиля', error);
    })
    .finally(() => {
      setButtonState(false, popupEditProfile);
    });
    
});

// валидация
enableValidation(validationConfig);
