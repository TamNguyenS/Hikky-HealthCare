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
        timeatvn: new Date().getTime(),
    }, ACCESS_TOKEN_LIFE, { expiresIn: '40s' });
}

const encodedRefreshToken = (userId) => {
    return JWT.sign({
        iss: 'hikkywannaflyauthrefreshtoken',
        sub: userId,
        role: 'user',
        timeatvn: new Date().getTime(),
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
    try {
        const { userName, password } = req.value.body;

        const loginUser = new db.User({ userName, password });

        console.log('>>working on : loginUser');

        // grenarate a access token
        // const accessToken = encodedAccessToken(userName);
        let { idUser, status, ...messenge } = await authService.loginUser(loginUser.userName, loginUser.password);
        console.log('>>check idyser', idUser);
        if (status === 200) {
            const accessToken = encodedAccessToken(idUser);
            const refreshToken = encodedRefreshToken(idUser);
            const updateRefreshToken = await db.User.update({ refreshToken: `${refreshToken}` }, { where: { id: `${idUser.idUser}` } });
            res.setHeader('Authorization', accessToken);
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: false, // set to true if your using https
                path: '/',
                sameSite: 'Strict',
            });
            return res.status(status).json({ ...messenge, accessToken });
        }
        return res.status(status).json(messenge);
    }
    catch (err) {
        console.log(`error from loginUser ${err.message}`)
        return res.status(500).json(err.message);
    }

}

const logoutUser = async (req, res) => {
    console.log('>>working on : logoutUser');
    try {
        const { refreshToken } = req.cookies('refresh_token');
        const isRefreshTokenExistOnDb = await db.User.count({ where: { refreshToken: `${refreshToken}` }, attributes: ['refreshToken'] });
        if (isRefreshTokenExistOnDb !== 1) {
            return res.status(403).json("Refresh token is not valid");
        }
        const deleteRefreshToken = await db.User.update({ refreshToken: null }, { where: { refreshToken: `${refreshToken}` } });
        res.setHeader('Authorization', null);
        return res.status(200).json("You're logged out");
    }
    catch (err) {
        console.log(`error from logoutUser ${err.message}`);
        return res.status(500).json(err.message);
    }

}


const secret = async (req, res) => {
    console.log('>>working on : secret');
    try {
        const oldRefreshtoken = req.cookies('refresh_token');
        if (!oldRefreshtoken) return res.status(401).json("You're not authenticated");
        const isRefreshTokenExistOnDb = await db.User.count({ where: { refreshToken: `${oldRefreshtoken}` }, attributes: ['refreshToken'] });
        if (isRefreshTokenExistOnDb !== 1) {
            return res.status(403).json("Refresh token is not valid");
        }
        JWT.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, userInfo) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err.message);
            }
            const newaccessToken = encodedAccessToken(userInfo.sub.idUser);
            const newrefreshToken = encodedRefreshToken(userInfo.sub.idUser);
            // const setNewRefreshToken = await db.User.update({ refreshToken: `${newrefreshToken}` }, { where: { id: `${userInfo.sub.idUser}` } });
            res.cookie("refresh_token", newrefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({
                accessToken: newaccessToken,
                refreshToken: newrefreshToken,
            });
        });

    }
    catch (err) {
        console.log(`error from secret ${err.message}`);
        return res.status(500).json(err.message);
    }

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    secret,
}