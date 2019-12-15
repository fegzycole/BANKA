const userEMailError = document.getElementById('userEMailError');

const userEmailTextBox = document.getElementById('userEmailTextBox');

const userPasswordError = document.getElementById('userPasswordError');

const userPasswordTextBox = document.getElementById('userPasswordTextBox');

const userPasswordError2 = document.getElementById('userPasswordError2');

const userPasswordTextBox2 = document.getElementById('userPasswordTextBox2');

const successForm = document.getElementById('successForm');

let test = false;

const authenticate = () => {
  if (userPasswordTextBox.value !== userPasswordTextBox2.value)
  {
    test = false;
    
    userPasswordError2.innerHTML = 'Password mismatch';

    userPasswordError2.style.display = 'block';
  }
  else
  {
    test = true;
    userPasswordTextBox2.style.borderBottom = '2px solid #3F51B5';

    userPasswordTextBox2.style.borderTop = 'none';

    userPasswordTextBox2.style.borderLeft = 'none';

    userPasswordTextBox2.style.borderRight = 'none';

    userPasswordError2.style.display = 'none';
  }
}

myForm.addEventListener('submit', validate);


const validate = (e) =>
{
  if (test === true)
  {
    successForm.style.display = 'block';
    userEmailTextBox.value = '';
    userPasswordTextBox.value = '';
    userPasswordTextBox2.value = '';
    setInterval(() => {
      successForm.style.display = 'none';
    }, 3000);
  }

  e.preventDefault();

}
