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




export { getAllCards, getUserProfile }