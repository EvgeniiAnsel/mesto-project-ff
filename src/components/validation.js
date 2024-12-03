// validation.js

// Показать ошибку ввода
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

// Скрыть ошибку ввода
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__error_visible');
};

// Проверка валидности поля
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    // Установка пользовательского сообщения об ошибке из data-error-message
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Проверка наличия невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Переключение состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.disabled = false;
  }
};

// Установка обработчиков событий
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  // Первичная проверка состояния кнопки
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Включение валидации для всех форм
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // Предотвращаем стандартное поведение формы
    });

    setEventListeners(formElement);
  });
};

// Новая функция для очистки валидации
export const clearValidation = () => {
  // Очистка всех сообщений об ошибках
  const errorElements = document.querySelectorAll('.form__input-error');
  errorElements.forEach((errorElement) => {
    errorElement.textContent = '';  // Очищаем текст ошибок
  });

  // Убираем стили ошибок с полей ввода
  const inputElements = document.querySelectorAll('.popup__input');
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');  // Убираем классы ошибок
  });
};
