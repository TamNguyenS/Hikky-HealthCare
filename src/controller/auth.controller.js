import db from '../models/index';
import authService from '../services/auth.service';
import JWT from 'jsonwebtoken';
import { JWT_SECRET, ACCESS_TOKEN_LIFE, ACCESS_TOKEN_SECRET } from '../config/index';
import { resolveShowConfigPath } from '@babel/core/lib/config/files';

const encodedAccessToken = (userId) => {
    return JWT.sign({
        iss: 'hikkywannaflyauthaccesstoken',
        sub: userId,
        role: 'user',
        timecreate: new Date().getTime(),
    }, ACCESS_TOKEN_LIFE, { expiresIn: '40s' });
}

const encodedRefreshToken = (userId) => {
    return JWT.sign({
        iss: 'hikkywannaflyauthrefreshtoken',
        sub: userId,
        role: 'user',
        timecreate: new Date().getTime(),
    }, ACCESS_TOKEN_SECRET, { expiresIn: '41s' });
}

const registerUser = async (req, res) => {
    const { userName, password, email, address, firstName, lastName, birthDay, phone, gender, roleId, positionId, image } = req.value.body;

    const newUser = new db.User({ userName, password, email, address, firstName, lastName, birthDay, phone, gender, roleId, positionId, image });

    let { status, ...message } = await authService.createNewUser(newUser);
    // encode a token 
    const token = encodedAccessToken(newUser.userName);

    res.setHeader('Authorization', token);

    return res.status(status).json(message);
}

const loginUser = async (req, res) => {
    const { userName, password } = req.value.body;

    const loginUser = new db.User({ userName, password });

    console.log('>>working on : loginUser');

    // grenarate a access token
    // const accessToken = encodedAccessToken(userName);
    let { idUser, status, ...messenge } = await authService.loginUser(loginUser.userName, loginUser.password);
    if (status === 200) {
        const accessToken = encodedAccessToken(idUser);
        const refreshToken = encodedRefreshToken(idUser);

        return res.status(status).json({ ...messenge, accessToken, refreshToken });
    }
    return res.status(status).json(messenge);
}

const logoutUser = async (req, res) => {


}


const secret = async (req, res) => {
    console.log('>>working on : secret');
    let messenge = await authService.loginUser(req.body.userName, req.body.password);
    return res.status(200).json(messenge);

}
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    secret,
}