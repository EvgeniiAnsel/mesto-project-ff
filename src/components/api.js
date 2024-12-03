const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
    headers: {
      authorization: "25c7281b-ee62-429d-9090-7b85d165a07d",
      "Content-Type": "application/json",
    },
};
  
const getAllCards = async () => {
    try {
      const request = await fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
      });
      return handleRequest(request);
    } catch (err) {
    console.error("Ошибка при запросе:", err);
      throw err;
    }
};