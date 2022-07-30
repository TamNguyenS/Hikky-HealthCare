import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);
const salt1 = bcrypt.genSaltSync(1);
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
            const case1 = db.Users.findOne({ where: { email: userName, password: password } });
            const case2 = db.Users.findOne({ where: { userName: userName, password: password } });
            validateEmail(userName) ? result = await case1 : result = await case2
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
            let idHash = await hashUserId(data.userName);
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
//hash user id 
let hashUserId = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashpass = await bcrypt.hashSync(id, salt1);
            resolve(hashpass);
        }
        catch (err) {
            console.le(`error from hashUserId${err.message}`);
            reject(` error from hashUserId ${err.message}`);
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
    createNewUser, loginUser
}
