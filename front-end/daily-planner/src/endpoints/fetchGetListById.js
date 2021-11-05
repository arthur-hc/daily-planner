import getTokenInLocalStorage from '../token/getTokenInLocalStorage';

const fetchGetListById = async (id) => {
  const token = getTokenInLocalStorage();
  const response = await fetch(`http://localhost:3001/api/tasklist/${id}`,
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

export default fetchGetListById;
