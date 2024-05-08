const Joi = require('joi');

const validator = require('validatorjs');

const ValidateUserCreationWithJoi = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().required(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9@#]{3,30}$')).required(),
            email: joi.string().email().required(),
            contact: joi.string().required(),
            phone_number: joi.string().required(),
            access_token: joi.array().items(joi.string().valid('x', 'y', 'z')),

        });

        await schema.validateAsync(req.body);
        next();
    } catch (err){
        return res.status(422).json({
            message: err.message,
            success: false});
    }
};

//login Validation

const ValidateUserLoginWithJoi = async (req, res, next) => {
    try {
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9@#]{3,30}$')).required(),
        });

        await schema.validateAsync(req.body);
        next();
    } catch (err){
        return res.status(422).json({
            message: err.message,
            success: false});
    }
}

module.exports = {
    ValidateUserCreationWithJoi, 
    ValidateUserLoginWithJoi
};



