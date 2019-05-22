const userEmailTextBox = document.getElementById('userEmailTextBox');

const userPasswordBox = document.getElementById('userPasswordTextBox');

const userEMailError = document.getElementById('userEMailError');

const myForm = document.getElementById('myForm');

const successForm = document.getElementById('successForm');

const userPasswordError = document.getElementById('userPasswordError');

const url = 'https://banka--app.herokuapp.com/api/v2/auth/signin';


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
      password: userPasswordTextBox.value,
    }),
  })
    .then(res => res.json())
    .then((data) => { 
      if (data.error === 'Your email is required, example fergusoniyara@banka.com') {
        userEMailError.textContent = data.error;
        userEMailErrorr.style.display = 'block';
        userEMailError.style.fontSize = '13px';
        userPasswordError.style.display = 'none';
      }
      if (data.error === 'Password should be at least 4 characters without any whitespace(s)') {
        userPasswordError.textContent = data.error;
        userPasswordError.style.display = 'block';
        userPasswordError.style.fontSize = '13px';
        userEMailError.style.display = 'none';
      }
      if (data.error === 'Email does not exist') {
        userEMailError.textContent = data.error;
        userEMailError.style.display = 'block';
        userEMailError.style.fontSize = '13px';
        userPasswordError.style.display = 'none';
      }
      if (data.error === 'Email or Password Incorrect') {
        successForm.textContent = data.error;
        successForm.style.display = 'block';
        userEMailError.style.display = 'none';
        userPasswordError.style.display = 'none';
      }
      if (!data.error) {
        const { type } = data.data;
        console.log(data);
        if (type === 'client') {
          sessionStorage.setItem('token', data.data.token);
          sessionStorage.setItem('email', data.data.email);
          sessionStorage.setItem('id', data.data.id);
          sessionStorage.setItem('firstName', data.data.firstName);
          sessionStorage.setItem('lastName', data.data.lastName);
          localStorage.setItem('email', data.data.email);
          sessionStorage.setItem('type', data.data.type);
          sessionStorage.setItem('admin', data.data.isadmin);         
          window.location.href = './Client/dashboard.html';
        }
        if (type === 'cashier') {
          window.location.href = './Cashier/cashtransaction.html';
        }
        if (type === 'admin') {
          window.location.href = './admin/view_accounts.html';
        }
      }
    });
};



myForm.addEventListener('submit', validate);
