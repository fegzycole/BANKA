const userEmailTextBox = document.getElementById('userEmailTextBox');

const userPasswordBox = document.getElementById('userPasswordTextBox');

const userEMailError = document.getElementById('userEMailError');

const myForm = document.getElementById('myForm');

const userPasswordError = document.getElementById('userPasswordError');

const validate = (e) => {
  
  if (userEmailTextBox.value.includes('admin')) {
   
    window.location.href = './admin/view_accounts.html';

  } else if (userEmailTextBox.value.includes('@banka.com') && !userEmailTextBox.value.includes('admin')) {
    
    window.location.href = './Cashier/cashtransaction.html';
  
  } else {
    
    window.location.href = './Client/dashboard.html';
  
  }
  
  e.preventDefault();
};

myForm.addEventListener('submit', validate);
