const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
  headers: {
    authorization: "25c7281b-ee62-429d-9090-7b85d165a07d",
    "Content-Type": "application/json",
  },
};

const getAllCards = () => {
  return fetch(`${config.baseUrl}/cards`,
  {headers: config.headers})

  .then ((res) => {
    if(!res.ok){
      return Promise.reject(`Ошибка ${res.status}`);
    }
    
    return(res.json())
  })

  .then ((dataCard) => {

    return(dataCard);
  })
}

const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`,
  {headers: config.headers})

  .then ((res) => {
    if(!res.ok){
      return Promise.reject(`Ошибка ${res.status}`);
    }
      
    return(res.json())
  })

  .then ((myProfile) => {

    return(myProfile);
  })

}

const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Authorization': config.headers.authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}`);
      }
      return res.json();
    })
    .then(() => {
      return getUserProfile();
    })
    .then((updatedProfile) => {
      console.log('получилось', updatedProfile);
    })
    .catch((error) => {
      console.error('не получилось', error);
    });
};


// const addNewCard = (name, link) => {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: 'POST',
//     headers: {
//       'Authorization': config.headers.authorization,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: name,
//       link: link,
//     })
//   })
//   .then((res) => {
//     if (!res.ok) {
//       return Promise.reject(`Ошибка ${res.status}`);
//     }
//     return res.json();
//   })
//   .then((newCard) => {
//     return newCard;
//   })
//   .catch((error) => {
//     console.error('Ошибка', error);
//   });
// };

// лайки
const handleLike = (card) => {
  // запрос на сервер для добавления/удаления лайка
  fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: card.likes.includes(userId) ? 'DELETE' : 'PUT',  // PUT если не лайкнуто, DELETE если лайкнуто
    headers: {
      'Authorization': config.headers.authorization,
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.json())
  .then((updatedCard) => {
    // Обновление карточки
    const cardElement = document.querySelector(`[data-id="${card._id}"]`);
    const likeCount = cardElement.querySelector('.card__like-count');
    likeCount.textContent = updatedCard.likes.length;  // Обновление количества лайков
    card.likes = updatedCard.likes;  // локальное обновление состояния лайков
  })
  .catch((error) => {
    console.error('Ошибка при обновлении лайков', error);
  });
};

function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      'Authorization': config.headers.authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error('Ошибка при добавлении карточки на сервер', error);
    });
}

const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar }),  // Отправляем новое изображение аватара
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}`);
      }
      return res.json();  // Возвращаем данные профиля после обновления аватара
    });
};


export { getAllCards, getUserProfile, updateProfile, handleLike, config, addCard, updateAvatar };
