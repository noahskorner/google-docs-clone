const emailNotVerified: Array<ResponseMessage> = [
  { msg: 'Please verify your email before logging in.' },
];
const userNotFound: Array<ResponseMessage> = [
  {
    msg: 'Your email or password is incorrect',
  },
];
const resetPassword: Array<ResponseMessage> = [
  {
    msg: 'If a user with that email exists, you will recieve a email with instructions to reset your password.',
  },
];

export { emailNotVerified, userNotFound, resetPassword };
