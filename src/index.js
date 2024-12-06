import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { setButtonState } from './components/card.js';
import logo from './images/logo.svg';
import { enableValidation, clearValidation, validationConfig, toggleButtonState } from './components/validation.js';  // Добавлен импорт validationConfig
import { getAllCards, getUserProfile, updateProfile, addCard, updateAvatar } from './components/api.js';

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
// ==================================
let userProfile = {};

// Получить и отобразить профиль
const setProfile = () => {
  getUserProfile()
  .then((myProfile) => {
    userProfile = myProfile; // Сохранить данные профиля
    profileTitle.textContent = myProfile.name;
    profileDescription.textContent = myProfile.about;
    profileAvatar.style.backgroundImage = `url(${myProfile.avatar})`;
  })
  .catch((error) => {
    console.error('Ошибка при обновлении профиля:', error);
  });
};

setProfile();

let currentUserId = '';

Promise.all([getUserProfile(), getAllCards()])
  .then(([myProfile, cardArray]) => {
    currentUserId = myProfile._id;
    setProfile(myProfile);

    // Построенпие карточек
    placesList.innerHTML = '';
    cardArray.forEach((card) => {
      const cardElement = createCard(card, {
        handleImageClick: openImagePopup,
        currentUserId,
      });
      placesList.prepend(cardElement);
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

  const inputList = Array.from(newCardForm.querySelectorAll(validationConfig.inputSelector));
  const submitButton = newCardForm.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, submitButton, validationConfig);

  openPopup(popupNewCard);
});

// обработчик для формы добавления карточки
newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  // данные из формы
  const placeNameInput = newCardForm.querySelector('input[name="place-name"]');
  const placeLinkInput = newCardForm.querySelector('input[name="link"]');

  // валидация данных
  if (!placeNameInput.validity.valid || !placeLinkInput.validity.valid) {
    return;
  }

  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
  const initialText = submitButton.textContent;

  // состояние загрузки
  setButtonState(submitButton, { isLoading: true, initialText, loadingText: 'Сохранение...' });

  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;

  // карточка через API
  addCard(placeName, placeLink)
    .then((newCardData) => {
      const newCard = createCard(newCardData, {
        handleImageClick: openImagePopup,
        currentUserId,
      });
      placesList.prepend(newCard);
      closePopup(popupNewCard);
      newCardForm.reset();
    })
    .catch((error) => {
      console.error('Ошибка при добавлении карточки на сервер', error);
    })
    .finally(() => {
      setButtonState(submitButton, { isLoading: false, initialText });
    });
});

profileAvatar.addEventListener('click', () => {
  newAvatarForm.reset(); // сброс формы
  clearValidation(newAvatarForm, validationConfig); // очистка ошибок

  const inputList = Array.from(newAvatarForm.querySelectorAll(validationConfig.inputSelector));
  const submitButton = newAvatarForm.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, submitButton, validationConfig);

  openPopup(popupNewAvatar);
});

newAvatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const avatarLink = avatarInput.value;
  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
  const initialText = submitButton.textContent;

  setButtonState(submitButton, { isLoading: true, initialText, loadingText: 'Сохранение...' });

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
      setButtonState(submitButton, { isLoading: false, initialText });
    });
});

// проверка состояния кнопки сохранения профиля
const toggleProfileSaveButton = () => {
  const isNameUnchanged = profileNameInput.value === userProfile.name;
  const isDescriptionUnchanged = profileDescriptionInput.value === userProfile.about;
  const submitButton = profileForm.querySelector(validationConfig.submitButtonSelector);

  if (isNameUnchanged && isDescriptionUnchanged) {
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
    submitButton.disabled = false;
  }
};

// обработчик открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  // заполняем форму из сохраненных данных
  profileNameInput.value = userProfile.name || '';
  profileDescriptionInput.value = userProfile.about || '';

  clearValidation(profileForm, validationConfig); // очистка ошибок валидации
  toggleProfileSaveButton(); // проверка состояние кнопки
  openPopup(popupEditProfile);
});

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;
  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
  const initialText = submitButton.textContent;

  setButtonState(submitButton, { isLoading: true, initialText, loadingText: 'Сохранение...' });

  updateProfile(name, description)
    .then(() => {
      setProfile();
      closePopup(popupEditProfile);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении профиля', error);
    })
    .finally(() => {
      setButtonState(submitButton, { isLoading: false, initialText });
    });
});

// валидация
enableValidation(validationConfig);
