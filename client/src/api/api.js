// API for the Net Zero backend
const BASE_URL = `http://localhost:5000/api`;

const updateHistory = (data) => {
  console.log("updateHistory called with data", data);
  const endpoint = 'odometer';
  return fetch(`${BASE_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data),
  })
};

// Until the API is ready for it, the password is ignored for now.
const signup = (username, password=null) => {
  console.log("Signup called for user", username);
  const endpoint = 'user/signup';
  return fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ username }),
  })
}

// Until the API is ready for it, the password is ignored for now.
const login = (username, password = null) => {
  console.log("login called for user", username);
  const endpoint = 'user/login';
  return fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ username }),
  })
}

module.exports = { updateHistory, signup, login };
