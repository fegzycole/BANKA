const url = 'https://banka--app.herokuapp.com/api/v2/accounts';

const token = sessionStorage.getItem('token');

const selectBox = document.querySelector('#selectBox');

const myForm = document.querySelector('form');

const successForm = document.querySelector('#successForm');

const validate = (e) => {
  e.preventDefault();
  fetch(url, {
    method: 'POST', // or 'PUT'
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'x-access-token': `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: selectBox.value,
    }),
  })
    .then(res => res.json())
    .then((res) => {
      if (!res.error) {
        successForm.style.display = 'block';
        setInterval(() => {
          successForm.style.display = 'none';
        }, 3000);
      }
    });
};
myForm.addEventListener('submit', validate);

const logoutButton = document.querySelector('#logout');
const logout = () => {
  sessionStorage.clear();
  localStorage.clear();
};
logoutButton.addEventListener('click', logout);
