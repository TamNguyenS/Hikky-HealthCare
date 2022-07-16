import bcrypt from 'bcryptjs';
import db from '../models/index';

var salt = bcrypt.genSaltSync(10);
const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// handle user login
let loginUser = async (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let result;
        try {
            // if (validateEmail(userName)) {
            //     result = await db.Users.findOne({ where: { email: userName, password: password } });
            // }
            // else {
            //     result = await db.Users.findOne({ where: { userName: userName, password: password } });
            // }
            validateEmail(userName) ? result = await db.Users.findOne({ where: { email: userName, password: password } }) : result = await db.Users.findOne({ where: { userName: userName, password: password } });
            if (result) {
                resolve({
                    process: 0,
                    message: 'Login successfully',
                    data: result
                });
            }
            else {
                resolve({
                    process: 1,
                    message: 'User name or password is incorrect'
                });
            }

        }
        catch (err) {
            console.le(`error from createNewUser ${err.message}`)
            reject({
                process: 1,
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
            await db.User.create({
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
                message: 'Register successfully'
            });
        }
        catch (err) {
            console.le(`error from createNewUser ${err.message}`)
            reject({
                process: 1,
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
            console.le(`error from hashUserPassword ${err.message}`);
            reject(` error from hashUserPassword ${err.message}`);
        }
    })
}

// validate email
let validateEmail = (email) => {
    let vaidateMail = email.match(regexMail);
    if (vaidateMail) {
        return true;
    }
    return false;
}

module.exports = {
    createNewUser,
}
