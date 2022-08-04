import express from 'express';
import userController from '../controller/user.controller';
// import { validateUserRegistration, schemas } from '../middleware/user.middleware';
// import validateUserRegistration from '../middleware/user.middleware';
// import schemas from './middleware/user.middleware';
// const { validateUserRegistration, schemas } = require('../middleware/user.middleware');
import { validateUserRegistration, validateUserLogin, schemas } from '../middleware/user.middleware';
const router = express.Router();

const initApiRoute = (app) => {
    router.post('/register', validateUserRegistration(schemas.registerUserSchema), userController.registerUser);

    router.post('/login', validateUserLogin(schemas.authLoginUser), userController.loginUser);

    router.get('/secret', userController.secret);

    router.post('/singout', userController.singout);

    router.get('/get-all-users', userController.getAllUsers);

    router.post('/create-user', userController.createUser);

    router.delete('/delete-user/:id', userController.deleteUser);

    router.put('/update-user/:id', userController.updateUser);

    return app.use('/api/auth', router);

}


export default initApiRoute;