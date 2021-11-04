const getTokenInLocalStorage = () => {
  const stored = localStorage.token;
  if (!stored) return false;
  const token = JSON.parse(stored);
  return token;
};

export default getTokenInLocalStorage;
