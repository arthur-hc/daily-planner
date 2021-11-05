import getTokenInLocalStorage from '../token/getTokenInLocalStorage';

const fetchNewTaskList = async (taskListName) => {
  const token = getTokenInLocalStorage();
  const response = await fetch('http://localhost:3001/api/tasklist',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: 'POST',
      body: JSON.stringify({ taskListName }),
    });
  const json = await response.json();
  return json;
};

export default fetchNewTaskList;
