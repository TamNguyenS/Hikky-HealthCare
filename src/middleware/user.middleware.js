import Joi from 'joi';
import db from '../models/index';
let phoneExit = false;
let emailExit = false;
let usernameExit = false;

const validateUserRegistration = (schema) => {
    return async (req, res, next) => {
        try {
            const errorBody = await schema.validate(req.body, { abortEarly: false });
            console.log(`>>>check error body ` + JSON.stringify(errorBody.error));

            const checkPhone = await isExits(`phone`, req.body.phone);
            const checkUsername = await isExits(`userName`, req.body.userName);
            const checkEmail = await isExits(`email`, req.body.email);

            await checkPhone === false ? phoneExit = false : phoneExit = true;
            await checkUsername === false ? usernameExit = false : usernameExit = true;
            await checkEmail === false ? emailExit = false : emailExit = true;
            if (errorBody.error || phoneExit || usernameExit || emailExit) {
                return res.status(400).json({
                    status: 400,
                    error: errorBody.error === undefined ? 'nothing' : errorBody.error.details.map(error => error.message),
                    phoneExit: phoneExit,
                    emailExit: emailExit,
                    usernameExit: usernameExit
                });
            }
            if (!req.value) req.value = {};
            if (!req.value['body']) req.value['body'] = {};
            req.value.body = errorBody.value;
            next();
        }
        catch (err) {
            console.log(err);

        }

    }
}
const isExits = async (type, data) => {
    const count = await db.User.count({
        where: { [type]: `${data}` },
    });
    if (count > 0) {
        return true;
    }
    return false;
}
// custom validation for user name but i'm lazy enough
const schemas = {
    registerUserSchema: Joi.object().keys({
        userName: Joi.string().required().messages({
            'string.base': `"a" should be a type of 'text'`,
            'string.empty': `"a" cannot be an empty field`,
            'string.min': `"a" should have a minimum length of {#limit}`,
            'any.required': `"a" is a required field`
        }),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).max(30).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/).required(),
        address: Joi.string().required(),
        birthDay: Joi.date().required(),
        gender: Joi.string().max(1).required(),
        roleId: Joi.string().required(),
        roleId: Joi.string().required(),
        roleId: Joi.string().required(),
        positionId: Joi.string().required(),
        image: Joi.string().required(),
    }),
}

module.exports = {
    validateUserRegistration,
    schemas,
}