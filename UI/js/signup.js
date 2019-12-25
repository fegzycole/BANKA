const userfirstNameTextBox = document.getElementById('userfirstNameTextBox');

const userlastNameTextBox = document.getElementById('userlastNameTextBox');

const userEmailTextBox = document.getElementById('userEmailTextBox');

const userPasswordTextBox = document.getElementById('userPasswordTextBox');

const successForm = document.getElementById('successForm');

const myForm = document.querySelector('form');

const url = 'https://banka--app.herokuapp.com/api/v2/auth/signup';

const showSuccessMessage = () => {
  successForm.textContent = 'User Created Successfully';
  successForm.style.display = 'block';
  userfirstNameTextBox.value = '';
  userlastNameTextBox.value = '';
  userEmailTextBox.value = '';
  userPasswordTextBox.value = '';
  setInterval(() => {
    successForm.style.display = 'none';
  }, 3000);
};

const performActionsOnResponseData = (responseData) => {
  if (responseData.error) {
    successForm.textContent = responseData.error;
    successForm.style.display = 'block';
  }
  if (!responseData.error) {
    showSuccessMessage();
  }
};

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
      performActionsOnResponseData(data);
    });
};

myForm.addEventListener('submit', validate);
