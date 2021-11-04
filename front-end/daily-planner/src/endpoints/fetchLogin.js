const fetch = async (email, password) => {
  const loginData = { email, password };
  const response = await fetch('http://localhost:3000/',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  console.log(response);
  // const json = await response.json();
  // return json;
};

export default fetch;
