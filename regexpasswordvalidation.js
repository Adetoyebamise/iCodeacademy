// DESCRIPTION:
// You need to write regex that will validate a password to make sure it meets the following criteria:

// At least six characters long
// contains a lowercase letter
// contains an uppercase letter
// contains a digit
// only contains alphanumeric characters (note that '_' is not alphanumeric)

function validate(password) {
  const Upper = password.match(/[A-Z]/)
  const Lower = password.match(/[a-z]/)
  const Number = password.match(/[0-9]/)
  const Length = password.length > 5
  if (password.replace(/[0-9A-Z]/gi, "").length > 0) return false
  return Upper && Lower && Number && Length
}

function validate(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/.test(password)
}