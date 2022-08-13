import express from 'express';
import userController from '../controller/user.controller';
import authController from '../controller/auth.controller';
// import { validateUserRegistration, schemas } from '../middleware/user.middleware';
// import validateUserRegistration from '../middleware/user.middleware';
// import schemas from './middleware/user.middleware';
// const { validateUserRegistration, schemas } = require('../middleware/user.middleware');
import { validateUserRegistration, validateUserLogin, schemas, checkExist } from '../middleware/user.middleware';
import { verifyRoleUser, verifyToken } from '../middleware/auth.verifyToken';
// import asyncHandler from '../middleware/async.handler';
const router = express.Router();

const initApiRoute = (app) => {
    router.post('/register', validateUserRegistration(schemas.registerUserSchema), checkExist, authController.registerUser);

    router.post('/login', validateUserLogin(schemas.authLoginUser), authController.loginUser);

    router.get('/secret', verifyRoleUser, authController.secret);

    router.post('/singout', verifyRoleUser, authController.logoutUser);

    router.post('/hikkywannafly', (req, res, next) => {
        res.send('hello hikkywannafly');
    })
    router
        .get('/user', verifyRoleUser, userController.getAllUsers)
        .post('/user', verifyRoleUser, userController.createUser)
        .delete('/user/:id', verifyRoleUser, userController.deleteUser)
        .put('/user/:id', verifyRoleUser, userController.updateUser);


    return app.use('/api/auth', router);

}


export default initApiRoute;