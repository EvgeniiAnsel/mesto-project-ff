// Импорт
import './pages/index.css';
/*import { initialCards } from './components/cards.js';*/
import { createCard, handleLike, handleDelete } from './components/card.js';
import { openPopup, closePopup, closePopupOnOverlayClick } from './components/modal.js';
import logo from './images/logo.svg';
import { enableValidation, clearValidation } from './components/validation.js';
import { getAllCards, getUserProfile, updateProfile, addCard } from './components/api.js';

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
        });

        // Добавляем data-id для поиска элемента по ID
        cardElement.setAttribute('data-id', card._id);
        placesList.prepend(cardElement);  // Добавляем карточку в список
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

// // Открытие попапа редактирования профиля
// profileEditButton.addEventListener('click', () => {
//   profileNameInput.value = profile.name;
//   profileDescriptionInput.value = profile.description;
//   clearValidation(profileForm, validationConfig);
//   openPopup(popupEditProfile);
// });

// // Обработчик отправки формы редактирования профиля
// profileForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   profile.name = profileNameInput.value;
//   profile.description = profileDescriptionInput.value;
//   // updateProfileInfo();
//   closePopup(popupEditProfile);
// });

// Открытие попапа добавления карточки
profileAddButton.addEventListener('click', () => openPopup(popupNewCard));

const loaderText = "Сохранение...";

// Функция для изменения состояния кнопки
function loadingButton(button, isLoading, initialText) {
  if (isLoading) {
    button.textContent = loaderText;
    button.disabled = true;
  } else {
    button.textContent = initialText;
    button.disabled = false;
  }
}

// Обработчик добавления новой карточки
// Обработчик добавления новой карточки
newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
  const initialText = submitButton.textContent;

  loadingButton(submitButton, true, initialText);

  const placeName = newCardForm.querySelector('input[name="place-name"]').value;
  const placeLink = newCardForm.querySelector('input[name="link"]').value;

  if (placeName && placeLink) {
    // Отправляем данные на сервер для добавления карточки
    addCard(placeName, placeLink)
      .then((newCardData) => {
        // Создаем карточку с данными, полученными от сервера
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

        // Добавляем новую карточку в DOM
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
// Сменить аватар
import { updateAvatar } from './components/api.js';

const profileAvatar = document.querySelector('.profile__image');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');

const newAvatarForm = popupNewAvatar.querySelector('.popup__form');
const avatarInput = newAvatarForm.querySelector('input[name="avatar-link"]');

profileAvatar.addEventListener('click', () => {
  openPopup(popupNewAvatar);
});

newAvatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const avatarLink = avatarInput.value;
  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
  const initialText = submitButton.textContent;

  // Изменяем текст и состояние кнопки на "Сохранение..."
  loadingButton(submitButton, true, initialText);

  if (avatarLink) {
    updateAvatar(avatarLink) // Отправка на сервер для обновления аватара
      .then(() => {
        // После успешного обновления аватара на сервере, обновляем аватар в DOM
        document.querySelector('.profile__image').style.backgroundImage = `url(${avatarLink})`;

        // Закрытие попапа и очистка формы
        closePopup(popupNewAvatar);
        newAvatarForm.reset();

        // Восстановление первоначального текста и состояния кнопки
        loadingButton(submitButton, false, initialText);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении аватара', error);
        // В случае ошибки восстанавливаем кнопку
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
      closePopup(popupEditProfile);  // Закрытие попапа после успешного обновления
    })
    .catch((error) => {
      console.error('Ошибка при обновлении профиля', error);
    });
});

enableValidation(validationConfig);
