import getTokenInLocalStorage from '../token/getTokenInLocalStorage';

const fetchEditTaskList = async (taskListData) => {
  const { _id, tasks } = taskListData;
  const token = getTokenInLocalStorage();
  const response = await fetch(`http://localhost:3000/api/tasklist/${_id}/updatetasks`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: 'PUT',
      body: JSON.stringify(tasks),
    });
  const json = await response.json();
  console.log(json);
  return json;
};

export default fetchEditTaskList;
