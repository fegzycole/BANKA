const userTextBox = document.getElementById('userTextBox');
const userPasswordBox = document.getElementById('userPasswordBox');
let userTextError = document.getElementById('userTextError');
let userPasswordError = document.getElementById('userPasswordError');


function validate(){
     if (userTextBox.value==='' && userPasswordBox.value===''){
        userTextBox.style.border = '1px solid red';
        userTextError.style.display = 'block';
        userPasswordBox.style.border = '1px solid red';
        userPasswordError.style.display = 'block'
      }
      else if(userTextBox.value===''&&userPasswordBox.value!==''){
          userTextBox.style.border = '1px solid red';
          userTextError.style.display = 'block';
          userPasswordBox.style.border = '1px solid green';
          userPasswordError.style.display = 'none';
      }
      else if(userPasswordBox.value===''&&userTextBox!=='')
      {
          userPasswordBox.style.border = '1px solid red';
          userPasswordError.style.display = 'block'
          userTextBox.style.border = '1px solid green';
          userTextError.style.display = 'none';
      }

      else{
          window.location.href= './user.html';
      }
   }





