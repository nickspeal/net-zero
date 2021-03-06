// API for the Net Zero backend
const BASE_URL = `/api`;

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

module.exports = { updateHistory };
