import getTokenInLocalStorage from '../token/getTokenInLocalStorage';

const fetchGetUserLists = async () => {
  const token = getTokenInLocalStorage();
  const loginData = { email, password };
  const response = await fetch('http://localhost:3000/api/tasklist',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  const json = await response.json();
  return json;
};

export default fetchGetUserLists;
