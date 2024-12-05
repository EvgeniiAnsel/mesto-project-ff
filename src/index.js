// Импорт
import './pages/index.css';
/*import { initialCards } from './components/cards.js';*/
import { createCard, handleLike, handleDelete } from './components/card.js';
import { openPopup, closePopup, closePopupOnOverlayClick } from './components/modal.js';
import logo from './images/logo.svg';
import { enableValidation, clearValidation } from './components/validation.js';
import { getAllCards, getUserProfile, updateProfile, addCard } from './components/api.js';
import { updateAvatar } from './components/api.js';

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

// смена аватара

const profileAvatar = document.querySelector('.profile__image');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');

const newAvatarForm = popupNewAvatar.querySelector('.popup__form');
const avatarInput = newAvatarForm.querySelector('input[name="avatar-link"]');


getAllCards()
  .then((data) => {
    console.log(data);
  });

const setProfile = () => {
  getUserProfile()
    .then((myProfile) => {
      document.querySelector('.profile__title').textContent = myProfile.name;
      document.querySelector('.profile__description').textContent = myProfile.about;
      document.querySelector('.profile__image').style.backgroundImage = `url('${myProfile.avatar}')`;
    });
};

setProfile();

// Инициализация ID текущего пользователя
let currentUserId = '';

getUserProfile()
  .then((myProfile) => {
    currentUserId = myProfile._id; // сохраняю свой ID текущего пользователя
    setProfile(); // Обновление профиля
    cardBuild(); // Построение карточек
  })
  .catch((error) => {
    console.error('Ошибка при получении данных пользователя', error);
  });


const cardBuild = () => {
  getAllCards()
    .then((cardArray) => {
      cardArray.forEach((card) => {
        const cardElement = createCard(card, {
          handleDelete,
          handleLike,
          handleImageClick: (card) => {
            const popupImage = document.querySelector('.popup_type_image');
            const popupImageImg = popupImage.querySelector('.popup__image');
            const popupCaption = popupImage.querySelector('.popup__caption');

            popupImageImg.src = card.link;
            popupImageImg.alt = card.name;
            popupCaption.textContent = card.name;

            openPopup(popupImage);
          },
          currentUserId, // передаем ID текущего пользователя
        });

        // Добавляю data-id для поиска элемента по ID
        cardElement.setAttribute('data-id', card._id);
        placesList.prepend(cardElement);  // Добавляю карточку в список
      });
    })
    .catch((error) => {
      console.error('Ошибка при загрузке карточек', error);
    });
};

cardBuild();


// Обработчики

// Закрытие попапов при клике на крестик
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

// Открытие попапа добавления карточки
profileAddButton.addEventListener('click', () => openPopup(popupNewCard));

const loaderText = "Сохранение...";

// изменение состояния кнопки
function loadingButton(button, isLoading, initialText) {
  if (isLoading) {
    button.textContent = loaderText;
    button.disabled = true;
  } else {
    button.textContent = initialText;
    button.disabled = false;
  }
}


// добавление новой карточки
newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
  const initialText = submitButton.textContent;

  loadingButton(submitButton, true, initialText);

  const placeName = newCardForm.querySelector('input[name="place-name"]').value;
  const placeLink = newCardForm.querySelector('input[name="link"]').value;

  if (placeName && placeLink) {
    // Отправляю данные на сервер для добавления карточки
    addCard(placeName, placeLink)
      .then((newCardData) => {
        // создаю карточку с данными, полученными от сервера
        const newCard = createCard(newCardData, {
          handleDelete,
          handleLike,
          handleImageClick: (card) => {
            const popupImage = document.querySelector('.popup_type_image');
            const popupImageImg = popupImage.querySelector('.popup__image');
            const popupCaption = popupImage.querySelector('.popup__caption');

            popupImageImg.src = card.link;
            popupImageImg.alt = card.name;
            popupCaption.textContent = card.name;

            openPopup(popupImage);
          },
        });

        // Добавление новую карточку в DOM
        placesList.prepend(newCard);
        
        // Закрытие попапа и очистка формы
        loadingButton(submitButton, false, initialText);
        closePopup(popupNewCard);
        newCardForm.reset();
        clearValidation(newCardForm, validationConfig);
      })
      .catch((error) => {
        console.error('Ошибка при добавлении карточки на сервер', error);
      });
  }
});


// смена аватара

profileAvatar.addEventListener('click', () => {
  openPopup(popupNewAvatar);
});

newAvatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const avatarLink = avatarInput.value;
  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
  const initialText = submitButton.textContent;

  // состояние кнопки "Сохранение..."
  loadingButton(submitButton, true, initialText);

  if (avatarLink) {
    updateAvatar(avatarLink) // Отправка на сервер для обновления аватара
      .then(() => {
        // После успешного обновления аватара на сервере, обновляет аватар в DOM
        document.querySelector('.profile__image').style.backgroundImage = `url(${avatarLink})`;

        closePopup(popupNewAvatar);
        newAvatarForm.reset();

        loadingButton(submitButton, false, initialText);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении аватара', error);
        loadingButton(submitButton, false, initialText);
      });
  }
});


// слушатель на оверлей
document.addEventListener('click', closePopupOnOverlayClick);

// валидация
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  getUserProfile()
    .then((myProfile) => {

      profileNameInput.value = myProfile.name;
      profileDescriptionInput.value = myProfile.about;

      clearValidation(profileForm, validationConfig);
      openPopup(popupEditProfile);
    })
});

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;

  updateProfile(name, description)
    .then((updatedProfile) => {
      setProfile(); // Вызов для обновления интерфейса
      closePopup(popupEditProfile);  // Закрытие попапа после обновления
    })
    .catch((error) => {
      console.error('Ошибка при обновлении профиля', error);
    });
});

enableValidation(validationConfig);
