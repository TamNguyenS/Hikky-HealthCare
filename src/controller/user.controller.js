import db from '../models/index';
import userService from '../services/user.service';

let registerUser = async (req, res) => {
    console.log('>>working on : registerUser');
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let loginUser = async (req, res) => {
    
}

let getAllUsers = async (req, res) => {
    console.log('>>working on : getAllUsers');
    return res.status(200).json({
        message: 'missing required params'
    })
}
let createUser = async (req, res) => {
    console.log('>>working on : getAllUsers');
    return res.status(200).json({ message: 'Hello' });
}
let deleteUser = async (req, res) => {
    console.log('>>working on : getAllUsers');
    return res.status(200).json({ message: 'deleteUser user' });
}
let updateUser = async (req, res) => {
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
    updateUser
}