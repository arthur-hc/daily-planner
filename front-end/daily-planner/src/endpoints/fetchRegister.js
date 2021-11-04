const fetchRegister = async (name, email, password) => {
  const registerData = { name, email, password };
  const response = await fetch('http://localhost:3000/api/register',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(registerData),
    });
  const json = await response.json();
  return json;
};

export default fetchRegister;
