import getTokenInLocalStorage from '../token/getTokenInLocalStorage';

const fetchGetUserLists = async () => {
  const token = getTokenInLocalStorage();
  const response = await fetch('http://localhost:3001/api/tasklist',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: 'GET',
    });
  const json = await response.json();
  return json;
};

export default fetchGetUserLists;
