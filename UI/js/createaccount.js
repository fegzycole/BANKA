myForm.addEventListener('submit',validate);
function validate(e){
    successForm.style.display        = 'block';
    userAccountNameTextBox.value     = '';
    userPhoneNoTextBox.value         = '';
    userEmailTextBox.value           = '';
    selectBox.value                  = '';
    setInterval(()=>{
      successForm.style.display      = 'none';
    },3000);
e.preventDefault();
}