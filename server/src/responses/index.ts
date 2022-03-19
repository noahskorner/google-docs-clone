const emailNotVerified: ResponseMessage = {
  message: 'Please verify your email before logging in.',
};
const userNotFound: ResponseMessage = {
  message: 'Your email or password is incorrect',
};
const resetPassword: ResponseMessage = {
  message:
    'If a user with that email exists, you will recieve a email with instructions to reset your password.',
};

export { emailNotVerified, userNotFound, resetPassword };
