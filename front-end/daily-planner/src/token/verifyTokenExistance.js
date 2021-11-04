import getTokenInLocalStorage from './getTokenInLocalStorage';

const verifyTokenExistance = (callback) => {
  const token = getTokenInLocalStorage();
  if (!token) {
    callback(true);
    return null;
  }
};

export default verifyTokenExistance;
