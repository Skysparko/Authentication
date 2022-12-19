function validateName(name) {
  const reg = new RegExp(/[a-zA-Z][a-zA-Z]+[a-zA-Z]$/);
  return reg.test(name);
}
function validateEmail(email) {
  const reg = new RegExp(/^\S+@\S+\.\S+$/);

  return reg.test(email);
}
function validatePassword(password) {
  const reg = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
  );
  return reg.test(password);
}

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
