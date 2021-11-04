const setTokenInLocalStorage = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
};

export default setTokenInLocalStorage;
