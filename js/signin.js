/* eslint-disable no-unused-vars */
const userEmailTextBox = document.getElementById('userEmailTextBox');
const userPasswordBox = document.getElementById('userPasswordTextBox');
const userEMailError = document.getElementById('userEMailError');
const myForm = document.getElementById('myForm');
// eslint-disable-next-line no-unused-vars
const userPasswordError = document.getElementById('userPasswordError');
function validate(e) {
  if (userEmailTextBox.value.includes('admin')) {
    window.location.href = './admin/addstaff.html';
  } else if (userEmailTextBox.value.includes('@banka.com') && !userEmailTextBox.value.includes('admin')) {
    window.location.href = './Cashier/cashtransaction.html';
  } else {
    window.location.href = './Client/dashboard.html';
  }
  e.preventDefault();
}
myForm.addEventListener('submit', validate);
