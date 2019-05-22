/* eslint-disable no-param-reassign */

const url = 'https://banka--app.herokuapp.com';

const token = sessionStorage.getItem('token');

const email = sessionStorage.getItem('email');

const firstName = sessionStorage.getItem('firstName');

const lastName = sessionStorage.getItem('lastName');

const accountBal = document.querySelector('#balance');

const userName = document.querySelector('#name');

const newTable = document.querySelectorAll('.table');

const tableHolder = document.querySelectorAll('.view-transactions');

const table2 = document.createElement('table');

table2.className = 'table';

table2.style.marginBottom = '50px';

const table = document.createElement('table');

table.className = 'table';

const p2 = document.createElement('p');

p2.className = 'noTransaction';

const p1 = document.createElement('p');

p1.className = 'noAccount';

const tableHeaders = ['Date Created', 'Account Number', 'Type', 'Status', 'Balance(₦)'];

const transactionHeaders = ['Date', 'Type', 'Account Number', 'Amount', 'Old Balance(₦)', 'New Balance(₦)'];

if (!token) {
  window.location.replace('../signin.html');
}

const titleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i += 1) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};


window.onload = () => {
  const initialize = () => {
    userName.textContent = `Welcome ${titleCase(firstName)} ${titleCase(lastName)}`;
    accountBal.textContent = '₦0';
    newTable[0].style.display = 'none';
    newTable[1].style.display = 'none';
    p1.textContent = 'You do not have any account with Banka';
    tableHolder[0].appendChild(p1);
    p2.textContent = 'You have not performed any transaction as of yet';
    tableHolder[1].appendChild(p2);
  };

  const generateTableHead = (tableVar, array, holder) => {
    const thead = tableVar.createTHead();
    const row = thead.insertRow();
    array.forEach((el) => {
      const th = document.createElement('th');
      const text = document.createTextNode(el);
      th.appendChild(text);
      row.appendChild(th);
      holder.appendChild(tableVar);
    });
  };

  const generateTable = (tableVar, data) => {
    data.forEach((el) => {
      const tableRow = tableVar.insertRow();
      const properties = Object.values(el);
      properties.forEach((element) => {
        const cell = tableRow.insertCell();
        const text = document.createTextNode(element);
        cell.appendChild(text);
      });
    });
  };

  const getUserTransactions = (dataTable) => {
    p2.style.display = 'none';
    generateTableHead(table2, transactionHeaders, tableHolder[1]);
    dataTable.accounts.forEach(({ accountnumber }) => {
      fetch(`${url}/api/v2/accounts/${accountnumber}/transactions`, {
        method: 'GET', // or 'PUT'
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'x-access-token': `${token}`,
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      }).then(response => response.json())
        .then((response) => {
          if (!response.error && response.data.length !== 0) {
            response.data.forEach((user) => {
              delete user.id;
            });
            generateTable(table2, response.data);
            p2.style.display = 'none';
          }
          if (response.data.length === 0) {
            table2.style.display = 'none';
            p2.style.display = 'block';
          }
        })
        .catch(err => err);
    });
  };


  const getUserAccounts = () => {
    let bal = 0;
    fetch(`${url}/api/v2/user/${email}/accounts`, {
      method: 'GET', // or 'PUT'
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    }).then(res => res.json())
      .then((res) => {
        if (!res.error) {
          res.accounts.forEach(({ balance }) => {
            bal += balance;
          });
          accountBal.textContent = `Balance: ₦${bal}`;
          generateTableHead(table, tableHeaders, tableHolder[0]);
          generateTable(table, res.accounts);
          p1.style.display = 'none';
          getUserTransactions(res);
        }
      })
      .catch(err => err);
  };
  initialize();
  getUserAccounts();
};
const logoutButton = document.querySelector('#logout');
const logout = () => {
  sessionStorage.clear();
  localStorage.clear();
};
logoutButton.addEventListener('click', logout);
