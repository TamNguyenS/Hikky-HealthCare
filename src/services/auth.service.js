import bcrypt from 'bcryptjs';
import db from '../models/index';
import { isExist } from './handler.service';
import md5 from 'md5';
import { loginFailed, loginSuccess, registerSuccess, registerFailed, registerError } from './index.service';
const salt = bcrypt.genSaltSync(10);

// handle user login
let loginUser = async (userName, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            // console.log('>>>check password login', password);
            // console.log('>>>check username login', userName);

            const userNameByEmail = await isExist('email', userName);
            const userNameByUserName = await isExist('userName', userName);
            // console.log('>>>check userNameByEmail', userNameByEmail, userNameByUserName);
            // console.log('>>>check username login', userNameByUserName);
            switch (true) {
                case userNameByEmail === true:
                    const result = await comparePassword(password, 'email', userName);
                    const idUser = await getIdUser(userName, 'email');
                    loginSuccess.idUser = idUser;
                    result === true ? resolve(loginSuccess) : resolve(loginFailed);
                    break;
                case userNameByUserName === true:
                    const result1 = await comparePassword(password, 'userName', userName);
                    const idUser1 = await getIdUser(userName, 'userName');
                    loginSuccess.idUser = idUser1;
                    result1 === true ? resolve(loginSuccess) : resolve(loginFailed);
                    break;
                default:
                    resolve(loginFailed);
                    break;
            }

        }
        catch (err) {
            console.log(`error from loginUser 1 ${err.message}`)
            // throw new Error(err.message);
            reject(loginFailed);
        }
    });

}


// handle user register 
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let passwordHash = await hashUserPassword(data.password);
            let idHash = md5(data.userName);
            const createUser = await db.User.create({
                id: idHash,
                userName: data.userName,
                password: passwordHash,
                firstName: data.firstName,
                lastName: data.lastName,
                birthDay: data.birthDay,
                address: data.address,
                phone: data.phone,
                email: data.email,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                positionId: data.positionId,
                image: data.image,
            })
            if (!createUser) {
                resolve(registerError);
            }
            resolve(registerSuccess);
        }
        catch (err) {
            console.log(`error from createNewUser ${err.message}`)
            resolve(registerFailed);

        }
    })
}

let comparePassword = async (password, type, data) => {
    const passwordDb = await db.User.findOne({ where: { [type]: `${data}` } });
    // console.log('>>>check password login', passwordDb.password);
    const result = await bcrypt.compare(password, passwordDb.password);
    if (result) {
        return true;
    }
    return false;
}
let getIdUser = async (data, type) => {
    const idDb = await db.User.findOne({ where: { [type]: `${data}` } });
    if (idDb) {
        return { idUser: idDb.id };
    }
    return false;
}
// hash user password
let hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashpass = await bcrypt.hash(password, salt);
            resolve(hashpass);
        }
        catch (err) {
            console.log(`error from hashUserPassword ${err.message}`);
            reject(` error from hashUserPassword ${err.message}`);
        }
    })
}


module.exports = {
    createNewUser, loginUser
}
