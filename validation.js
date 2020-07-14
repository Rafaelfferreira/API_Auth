const Joi =  require('@hapi/joi');

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object ({
        name: Joi.string().min(6).max(255).required(),
        email:  Joi.string().min(10).max(255).email().required(),
        password: Joi.string().min(6).max(1024).required()
    });
    

    return schema.validate(data); //returns a result object with a .error or .value
}

const loginValidation = (data) => {
    const schema = Joi.object ({
        email:  Joi.string().min(10).max(255).email().required(),
        password: Joi.string().min(6).max(1024).required()
    });
    

    return schema.validate(data); //returns a result object with a .error or .value
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;