const userEmailTextBox = document.getElementById('userEmailTextBox');

const userPasswordBox = document.getElementById('userPasswordTextBox');

const myForm = document.getElementById('myForm');

const successForm = document.getElementById('successForm');

const url = 'https://banka--app.herokuapp.com/api/v2/auth/signin';

const setSessionStorage = (dataSource) => {
  sessionStorage.setItem('token', dataSource.data.token);
  sessionStorage.setItem('email', dataSource.data.email);
  sessionStorage.setItem('id', dataSource.data.id);
  sessionStorage.setItem('firstName', dataSource.data.firstName);
  sessionStorage.setItem('lastName', dataSource.data.lastName);
  localStorage.setItem('email', dataSource.data.email);
  sessionStorage.setItem('type', dataSource.data.type);
};

const redirectUserBasedOnRole = (typeOfUser) => {
  switch (typeOfUser) {
    case 'client':
      window.location.href = './Client/dashboard.html';
      break;
    case 'cashier':
      window.location.href = './Cashier/cashtransaction.html';
      break;
    case 'admin':
      window.location.href = './admin/addstaff.html';
      break;
    default:
      successForm.textContent = 'Something has gone wrong, contact admin';
      break;
  }
};

const displayErrorMessage = (dataSource) => {
  successForm.textContent = dataSource.error;
  successForm.style.display = 'block';
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
      email: userEmailTextBox.value,
      password: userPasswordBox.value,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.error)displayErrorMessage(data);
      if (!data.error) {
        successForm.style.display = 'none';
        setSessionStorage(data);
        redirectUserBasedOnRole(data.data.type);
      }
    });
};

myForm.addEventListener('submit', validate);
