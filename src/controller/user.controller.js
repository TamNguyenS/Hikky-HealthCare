import db from '../models/index';
import userService from '../services/user.service';
import JWT from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index';
import { resolveShowConfigPath } from '@babel/core/lib/config/files';

const encodedToken = (userId) => {
    return JWT.sign({
        iss: 'hikkywannaflyauth',
        sub: userId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 2)
    }, JWT_SECRET);
}

const registerUser = async (req, res) => {
    const { userName, password, email, address, firstName, lastName, birthDay, phone, gender, roleId, positionId, image } = req.value.body;

    const newUser = new db.User({ userName, password, email, address, firstName, lastName, birthDay, phone, gender, roleId, positionId, image });

    let message = await userService.createNewUser(newUser);
    // encode a token 
    const token = encodedToken(newUser.userName);

    res.setHeader('Authorization', token);

    return res.status(201).json(message);
}

const loginUser = async (req, res) => {
    const { userName, password } = req.value.body;

    const loginUser = new db.User({ userName, password });

    console.log('>>working on : loginUser');

    console.log(loginUser.userName);
    console.log(loginUser.password);
    let messenge = await userService.loginUser(loginUser.userName, loginUser.password);

    return res.status(200).json(messenge);
}

const secret = async (req, res) => {
    console.log('>>working on : secret');
    let messenge = await userService.loginUser(req.body.userName, req.body.password);
    return res.status(200).json(messenge);

}

const getAllUsers = async (req, res) => {
    console.log('>>working on : getAllUsers');
    return res.status(200).json({
        message: 'missing required params'
    })
}
const createUser = async (req, res) => {
    console.log('>>working on : getAllUsers');
    return res.status(200).json({ message: 'Hello' });
}
const deleteUser = async (req, res) => {
    console.log('>>working on : getAllUsers');
    return res.status(200).json({ message: 'deleteUser user' });
}
const updateUser = async (req, res) => {
    console.log('>>working on : updateUser');
    return res.status(200).json({ message: 'update user' });
}


// export default { registerUser, loginUser, getAllUsers, createUser, deleteUser, updateUser };
module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    secret,
}