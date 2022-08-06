import Joi from 'joi';
import db from '../models/index';
let phoneExit = false;
let emailExit = false;
let usernameExit = false;
const ROLES = [];
const emailExits = 'Email is already in use';
const phoneExits = 'Phone is already in use';
const userName = 'Email is already in use';

const validateUserRegistration = (schema) => {
    return async (req, res, next) => {
        try {
            const errorBody = await schema.validate(req.body, { abortEarly: false });
            console.log(`>>>check error body ` + JSON.stringify(errorBody.error));


            if (errorBody.error) {
                return res.status(400).json({
                    status: 400,
                    error: errorBody.error === undefined ? 'nothing' : errorBody.error.details.map(error => error.message),
                    message: 'register failed',
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

const checkExist = async (req, res, next) => {
    try {
        const checkPhone = await isExist(`phone`, req.value.body.phone);
        const checkUsername = await isExist(`userName`, req.value.body.userName);
        const checkEmail = await isExist(`email`, req.value.body.email);

        checkPhone === false ? phoneExit = false : phoneExit = true;
        checkUsername === false ? usernameExit = false : usernameExit = true;
        checkEmail === false ? emailExit = false : emailExit = true;

        if (phoneExit || usernameExit || emailExit) {
            return res.status(403).json({
                status: 403,
                phoneExit: phoneExit,
                emailExit: emailExit,
                usernameExit: usernameExit,
                message: 'register failed',
            });
          
        }
        next();
    }
    catch (err) {
        console.log(err);

    }

}
const validateUserLogin = (schema) => {
    return async (req, res, next) => {
        try {
            const errorBody = await schema.validate(req.body, { abortEarly: false });
            // console.log(`>>>check error body ` + JSON.stringify(errorBody.error));
            // console.log('>>check req body', req.body);
            if (errorBody.error) {
                return res.status(400).json({
                    status: 400,
                    error: errorBody.error === undefined ? 'nothing' : errorBody.error.details.map(error => error.message),
                    message: 'login failed',
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

const isExist = async (type, data) => {
    const count = await db.User.count({
        where: { [type]: `${data}` },
    });
    if (count > 0) {
        return true;
    }
    return false;
}
const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
}
// custom validation for user name but i'm lazy enough
const schemas = {
    registerUserSchema: Joi.object().keys({
        userName: Joi.string().max(15).min(3).required().messages({
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
        positionId: Joi.string().required(),
        image: Joi.string().required(),
    }),
    authLoginUser: Joi.object().keys({
        userName: Joi.string().required().messages({
            'string.empty': `"userName not allow empty`,
        }),
        password: Joi.string().required().messages({
            'string.empty': `"password not allow empty`,
        }),

    }),
}

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    schemas,
    checkExist
}