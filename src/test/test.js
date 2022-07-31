
// import bcrypt from 'bcryptjs';

// const salt = bcrypt.genSaltSync(10);

// let hashUserId = async (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let hashpass = await bcrypt.hashSync(id, salt);
//             resolve(hashpass);
//         }
//         catch (err) {
//             console.le(`error from hashUserPassword ${err.message}`);
//             reject(` error from hashUserPassword ${err.message}`);
//         }
//     })
// }
// console.log(hashUserId('1'));