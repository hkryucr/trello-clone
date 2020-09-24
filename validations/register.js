const Validator = require('validator');
const validText = require("./validText");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = validText(data.email) ? data.email : ""
    data.fullName = validText(data.fullName) ? data.fullName : "";
    data.password = validText(data.password) ? data.password : ""
    data.password2 = validText(data.password2) ? data.password2 : ""
    data.initials = validText(data.initials) ? data.initials : "";
    data.bio = validText(data.bio) ? data.bio : "";
    
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    };
    
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    };
    
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    };

    if (!Validator.isLength(data.password, { min: 6 })) {
        errors.password = 'Password must be at least 6 characters'
    };

    // if (!Validator.equals(data.password, data.password2)) {
    //     errors.password2 = "Passwords must match"
    // };

    if (Validator.isEmpty(data.fullName)) {
        errors.fullName = "Full name field is required"
    };

    // if (Validator.isEmpty(data.initials)) {
    //     errors.initials = "Initials field is required";
    // };

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

};