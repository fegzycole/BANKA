let validate = (e) => {
  successForm.style.display = 'block';
  staffNameTextBox.value = '';
  staffEmailTextBox.value = '';
  staffPasswordTextBox.value = '';
  selectBox.value = '';
  setInterval(() => {
    successForm.style.display = 'none';
  }, 5000);
  e.preventDefault();
};
myForm.addEventListener('submit', validate);
