const userFirstNameError = document.getElementById('userFirstNameError');

const userfirstNameTextBox = document.getElementById('userfirstNameTextBox');

const userLastNameError = document.getElementById('userLastNameError');

const userlastNameTextBox = document.getElementById('userlastNameTextBox');

const userEMailError = document.getElementById('userEMailError');

const userEmailTextBox = document.getElementById('userEmailTextBox');

const userPasswordError = document.getElementById('userPasswordError');

const userPasswordTextBox = document.getElementById('userPasswordTextBox');

const userPasswordError2 = document.getElementById('userPasswordError2');

const userPasswordTextBox2 = document.getElementById('userPasswordTextBox2');

const successForm = document.getElementById('successForm');

const myForm = document.querySelector('form');

const url = 'https://banka--app.herokuapp.com/api/v2/auth/signup';

let test = false;

function authenticate() {
  if (userPasswordTextBox.value !== userPasswordTextBox2.value) {
    test = false;

    userPasswordError2.innerHTML = 'Password mismatch';

    userPasswordError2.style.display = 'block';
  } else {
    test = true;

    userPasswordTextBox2.style.borderBottom = '2px solid #3F51B5';

    userPasswordTextBox2.style.borderTop = 'none';

    userPasswordTextBox2.style.borderLeft = 'none';

    userPasswordTextBox2.style.borderRight = 'none';

    userPasswordError2.style.display = 'none';
  }
}

const validate = (e) => {
  e.preventDefault();
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      firstName: userfirstNameTextBox.value,
      lastName: userlastNameTextBox.value,
      email: userEmailTextBox.value,
      password: userPasswordTextBox.value,
      type: 'client',
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.error === 'First name is required, It should have no whitespace(s) in between its characters') {
        userFirstNameError.textContent = data.error;
        userFirstNameError.style.display = 'block';
        userFirstNameError.style.fontSize = '13px';
        userLastNameError.style.display = 'none';
        userEMailError.style.display = 'none';
        userPasswordError.style.display = 'none';
      }
      if (data.error === 'Last name is required, It should have no whitespace(s) in between its characters') {
        userLastNameError.textContent = data.error;
        userLastNameError.style.display = 'block';
        userLastNameError.style.fontSize = '13px';
        userFirstNameError.style.display = 'none';
        userEMailError.style.display = 'none';
        userPasswordError.style.display = 'none';
      }
      if (data.error === 'Your email is required, example fergusoniyara@banka.com') {
        userEMailError.textContent = data.error;
        userEMailError.style.display = 'block';
        userEMailError.style.fontSize = '13px';
        userLastNameError.style.display = 'none';
        userFirstNameError.style.display = 'none';
        userPasswordError.style.display = 'none';
      }
      if (data.error === 'Password should be at least 4 characters without any whitespace(s)') {
        userPasswordError.textContent = data.error;
        userPasswordError.style.display = 'block';
        userPasswordError.style.fontSize = '13px';
        userLastNameError.style.display = 'none';
        userEMailError.style.display = 'none';
        userFirstNameError.style.display = 'none';
      }
      if (data.error === 'Email Already Exists') {
        userEMailError.textContent = data.error;
        userEMailError.style.display = 'block';
        userEMailError.style.fontSize = '13px';
        userLastNameError.style.display = 'none';
        userFirstNameError.style.display = 'none';
        userPasswordError.style.display = 'none';
      }
      if (!data.error) {
        successForm.style.display = 'block';
        userLastNameError.style.display = 'none';
        userEMailError.style.display = 'none';
        userFirstNameError.style.display = 'none';
        userPasswordError.style.display = 'none';
        userfirstNameTextBox.value = '';
        userlastNameTextBox.value = '';
        userEmailTextBox.value = '';
        userPasswordTextBox.value = '';

        setInterval(() => {
          successForm.style.display = 'none';
        }, 3000);
      }
    });
};


myForm.addEventListener('submit', validate);
