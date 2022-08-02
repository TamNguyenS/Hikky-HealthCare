import bcrypt from 'bcryptjs';
import db from '../models/index';
import md5 from 'md5';

const salt = bcrypt.genSaltSync(10);

// handle user login
let loginUser = async (userName, password) => {
    return new Promise(async (resolve, reject) => {

        try {
            let hashpass = await bcrypt.hashSync(password, salt);
            console.log('>>>check password login', hashpass);
            console.log('>>>check username login', userName);
            const case1 = await db.User.count({ where: { email: userName, password: hashpass } });
            const case2 = await db.User.count({ where: { userName: userName, password: hashpass } });

            if (case1 === 1 || case2 === 1) {
                resolve({
                    process: 0,
                    susscess: true,
                    message: 'Login successfully',
                    data: result
                });
            }
            else {
                resolve({
                    process: 1,
                    susscess: false,
                    message: 'User name or password is incorrect'
                });
            }

        }
        catch (err) {
            console.log(`error from loginUser ${err.message}`)
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
            console.le(`error from createNewUser ${err.message}`)
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
            console.le(`error from hashUserPassword ${err.message}`);
            reject(` error from hashUserPassword ${err.message}`);
        }
    })
}


module.exports = {
    createNewUser, loginUser
}
