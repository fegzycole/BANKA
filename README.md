# Banka-Project <a href="https://codeclimate.com/github/fegzycole/Banka-Project/maintainability"><img src="https://api.codeclimate.com/v1/badges/eeb800fdd3ccccdfb721/maintainability" /></a>

[![Build Status](https://travis-ci.com/fegzycole/Banka-Project.svg?branch=develop)](https://travis-ci.com/fegzycole/Banka-Project)
Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money


<img src = './UI/Images/Capture.png' alt = 'Banka Landing Page' >


## Required Features
- User (client) can sign up.
- User (client) can login.
- User (client) can create an account.
- User (client) can view account transaction history.
- User (client) can view a specific account transaction.
- Staff (cashier) can debit user (client) account.
- Staff (cashier) can credit user (client) account.
- Admin/staff can view all user accounts.
- Admin/staff can view a specific user account.
- Admin/staff can activate or deactivate an account.
- Admin/staff can delete a specific user account.
- Admin can create staff and admin user accounts.


## Options Features
- User can reset password.
- Integrate real time email notification upon credit/debit transaction on user account.
- User can upload a photo to their profile.

## Technologies

- Node JS
- Express
- Mocha & Chai
- ESLint
- Babel
- Travis CI
- Code Climate & Coveralls


## Requirements and Installation

To install and run this project you would need to have listed stack installed:

- Node Js
- Git

To run:

```sh
git clone <https://github.com/fegzycole/Banka-Project.git>
cd Banka-Project
npm install
npm start-dev
```

## Testing

```sh
npm run test
```

## API-ENDPOINTS

- V1

`- POST /api/v1/auth/signup Create a new user account.`

`- POST /api/v1/auth/signin log a user in.`

`- POST /api/v1/accounts Create a bank account.`

`- PATCH /api/v1/account/<account-number> Activate or deactivate an account.`

`- DELETE /api/v1/accounts/<account-number> Delete a user account`

`- POST /api/v1/transactions/<account-number>/debit Debit a bank account.`

`- POST /transactions/<account-number>/credit Credit a bank account..`


## Pivotal Tracker stories

[https://www.pivotaltracker.com/n/projects/2319896]


## Template UI

You can see a hosted version of the template at [https://fegzycole.github.io/Banka-Project/](https://fegzycole.github.io/Banka-Project/)


## API

Hosted on [https://banka--app.herokuapp.com/](https://banka--app.herokuapp.com/)

## Author

Iyara Oghenefegor Ferguson

