/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
const url = 'https://banka--app.herokuapp.com';
const token = sessionStorage.getItem('token');
const email = sessionStorage.getItem('email');
const table = document.querySelector('table');
const accountNumberTextBox = document.querySelector('#accountNumberTextBox');
const myForm = document.querySelector('form');

if (!token) {
  window.location.replace('../signin.html');
}

const generateTable = (responseData) => {
  responseData.map((transaction) => {
    const date = new Date(transaction.createdon);
    const tableRow = `
      <tr>
        <td>${date.toDateString()}</td>
        <td>${transaction.type}</td>
        <td>${transaction.accountnumber}</td>
        <td>₦ ${transaction.amount}</td>
        <td>₦ ${transaction.oldbalance}</td>
        <td>₦ ${transaction.newbalance}</td>
      </tr>
    `;
    table.innerHTML += tableRow;
  });
};

const getSpecificAccountTransaction = (e) => {
  e.preventDefault();
  const tr = table.querySelectorAll('tr');
  tr.forEach((el, i, array) => {
    const td = el.querySelectorAll('td');
    if (el !== array[0]) {
      if (td[2].innerText !== accountNumberTextBox.value) {
        array[i].style.display = 'none';
      }
    }
  });
};

window.onload = () => {
  const getUserTransactions = () => {
    fetch(`${url}/api/v2/user/${email}/transactions`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    }).then(response => response.json())
      .then((response) => {
        if (!response.error && response.accounts.length !== 0) {
          generateTable(response.accounts);
        }
      })
      .catch(err => err);
  };
  getUserTransactions();
};
myForm.addEventListener('submit', getSpecificAccountTransaction);
