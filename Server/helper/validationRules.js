const signup = {
  email: 'required|email',
  firstName: 'required|string|alpha|min:2',
  lastName: 'required|string|alpha|min:2',
  password: 'required|string|alpha_num|min:5',
};

export default signup;
