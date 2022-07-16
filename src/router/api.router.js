import express from 'express';
import userController from '../controller/user.controller';

const router = express.Router();

const initApiRoute = (app) => {
    router.post('/register', userController.registerUser);
    router.post('/login', userController.loginUser);
    router.get('/get-all-users', userController.getAllUsers);
    router.post('/create-user', userController.createUser);
    router.delete('/delete-user/:id', userController.deleteUser);
    router.put('/update-user/:id', userController.updateUser);
    return app.use('/api/v1', router);
}


export default initApiRoute;