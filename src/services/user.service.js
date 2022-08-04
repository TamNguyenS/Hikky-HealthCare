import bcrypt from 'bcryptjs';
import db from '../models/index';
import { isExist } from './handler.service';
import md5 from 'md5';

const salt = bcrypt.genSaltSync(10);

// handle user login
let loginUser = async (userName, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            console.log('>>>check password login', password);
            console.log('>>>check username login', userName);

            const userNameByEmail = await isExist('email', userName);
            const userNameByUserName = await isExist('userName', userName);
            console.log('>>>check username login', userNameByUserName);
            if (userNameByUserName) {
                const passwordDb = await db.User.findOne({ where: { username: userName } });
                const result = await bcrypt.compareSync(password, passwordDb.password);
                if (result) {
                    resolve({
                        process: 0,
                        susscess: true,
                        message: 'Login successfully',
                    });
                }
                else {
                    reject({
                        process: 1,
                        susscess: false,
                        message: 'User name or password is incorrect',
                    });
                }
            }
            else {
                resolve({
                    process: 1,
                    susscess: false,
                    message: 'User name or password is incorrect',
                });
            }

        }
        catch (err) {
            console.log(`error from loginUser 1 ${err.message}`)
            // throw new Error(err.message);
            reject({
                process: 1,
                susscess: false,
                message: 'User name or password is incorrect'
            });
        }
    });

}


// handle user register 
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let passwordHash = await hashUserPassword(data.password);
            let idHash = md5(data.userName);
            await db.User.create({
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
            resolve({
                process: 0,
                susscess: true,
                message: 'Register successfully'
            });
        }
        catch (err) {
            console.log(`error from createNewUser ${err.message}`)
            reject({
                process: 1,
                susscess: true,
                message: 'Something went wrong'
            });

        }
    })


}

// hash user password
let hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashpass = await bcrypt.hashSync(password, salt);
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
