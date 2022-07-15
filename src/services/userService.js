import bcrypt from 'bcryptjs';
import db from '../models/index';

var salt = bcrypt.genSaltSync(10);
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
        }
        catch (err) {
            reject(` error from createNewUser ${err.message}`);
        }
    })


}


let hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashpass = await bcrypt.hashSync(password, salt);
            resolve(hashpass);
        }
        catch (err) {
            reject(` error from hashUserPassword ${err.message}`);
        }
    })

}

module.exports = {
    createNewUser,
}
