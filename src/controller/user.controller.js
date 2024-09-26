import db from '../models/index';
import userService from '../services/auth.service';
import JWT from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index';
import { resolveShowConfigPath } from '@babel/core/lib/config/files';

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
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
}