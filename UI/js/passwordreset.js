const userEMailError       = document.getElementById('userEMailError');
  let userEmailTextBox     = document.getElementById('userEmailTextBox');
const userPasswordError    = document.getElementById('userPasswordError');
  let userPasswordTextBox  = document.getElementById('userPasswordTextBox');
  let userPasswordError2   = document.getElementById('userPasswordError2');
  let userPasswordTextBox2 = document.getElementById('userPasswordTextBox2');
const successForm          = document.getElementById('successForm');
 let  test = false;
 function authenticate(){
     console.log(userPasswordTextBox.value)
  if(userPasswordTextBox.value!==userPasswordTextBox2.value)
  {
     test = false;
     userPasswordError2.innerHTML     = `Password mismatch`;
     userPasswordError2.style.display = 'block';
     
  }
  else
  {
     test = true;
     userPasswordTextBox2.style.borderBottom      = '2px solid #3F51B5';
     userPasswordTextBox2.style.borderTop         = 'none';
     userPasswordTextBox2.style.borderLeft        = 'none';
     userPasswordTextBox2.style.borderRight       = 'none';
     userPasswordError2.style.display             = 'none';
  }
}

myForm.addEventListener('submit',validate);


function validate(e)
  {
     if (test==true)
     {
          successForm.style.display  = 'block';
          userEmailTextBox.value     = '';
          userPasswordTextBox.value  = '';
          userPasswordTextBox2.value = '';
          setInterval(()=>{
            successForm.style.display = 'none';
          },3000);
     }

     e.preventDefault();

}
