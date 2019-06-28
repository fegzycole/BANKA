const url = 'https://banka--app.herokuapp.com/api/v2/accounts';

const token = sessionStorage.getItem('token');

const selectBox = document.querySelector('#selectBox');

const firstName = sessionStorage.getItem('firstName');

const lastName = sessionStorage.getItem('lastName');

const usersFullNameTextBox = document.querySelector('#userAccountNameTextBox');

const email = sessionStorage.getItem('email');

const userEmailTextBox = document.querySelector('#userEmailTextBox');

const myForm = document.querySelector('form');

const successForm = document.querySelector('#successForm');

window.onload = () => {
  const titleCase = (str) => {
    const splitStr = str.toLowerCase().split(' ').map(el => el.charAt(0).toUpperCase() + el.substring(1));
    return splitStr.join(' ');
  };
  const initialize = () => {
    usersFullNameTextBox.value = `${titleCase(firstName)} ${titleCase(lastName)}`;
    usersFullNameTextBox.disabled = true;
    userEmailTextBox.value = email;
  };

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
  initialize();
  myForm.addEventListener('submit', validate);
};

const logoutButton = document.querySelector('#logout');
const logout = () => {
  sessionStorage.clear();
  localStorage.clear();
};
logoutButton.addEventListener('click', logout);
