const validator = require('validator')
const isEmpty = require('is-empty')

const validateRegisterInput = (data) => {
    let errors = {}

    // Convert fields into empty string initially
    data.firstname = !isEmpty(data.firstname) ? data.firstname : ''
    data.lastname = !isEmpty(data.lastname) ? data.lastname : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    // Name Check
    if (validator.isEmpty(data.firstname)) {
        errors.firstname = "First Name field is required"
    }

    // Name Check
    if (validator.isEmpty(data.lastname)) {
        errors.lastname = "Last Name field is required"
    }

    // Email Check
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    // Password Check
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput