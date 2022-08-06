import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_LIFE } from '../config/index';
const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    // const refreshToken = req.cookies.refreshToken;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_LIFE, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You're not authenticated");
    }
};

module.exports = verifyToken;