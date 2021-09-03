import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { comparePass, encrypStr } from '../common/tools';
import { iResult } from '../model/result';

const jwtSecret: string = config.token.secretOrPrivateKey;
const tokenExpirationInSeconds = 300;

const NAMESPACE = 'Tools';
let result: iResult = {
    status: false,
    message: '',
    response: null
};

class AuthController {
    async verifyUserPassword(req: Request, res: Response, next: NextFunction) {
        let user: any;
        // const user: any = await usersService.getUserByEmailWithPassword(req.body.email);
        let { usu, pass } = req.body;
        if (usu === config.user.name && pass === config.user.pass) {
            console.log('usu-pass' + usu + '-' + pass);
            user = {
                _id: 'h4n5010',
                name: 'han',
                email: 'han@gmail.com',
                role: 1,
                password: (await encrypStr(pass)).response
            };
        }
        if (user) {
            const passwordHash = user.password;
            console.log('passwordHash::' + passwordHash);
            const tres = (await encrypStr(pass)).response;
            console.log('tres::' + tres);
            const passBodyHash = (await encrypStr(req.body.pass)).response;
            console.log('passBodyHash::' + passBodyHash);
            if (await (await comparePass(req.body.pass, passwordHash)).status) {
                req.body = {
                    userId: user._id,
                    email: user.email,
                    role: user.role
                };
                return next();
            }
        }
        result.status = false;
        result.message = 'Usuario y/o contraseña incorrectos';
        result.response = null;
        res.status(200).send(result);
    }
    async createJWT(req: Request, res: Response) {
        try {
            const refreshId = req.body.userId + jwtSecret;
            const salt = crypto.createSecretKey(crypto.randomBytes(16));
            const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
            req.body.refreshKey = salt.export();
            const token = jwt.sign(req.body, jwtSecret, {
                expiresIn: tokenExpirationInSeconds
            });
            result.status = true;
            result.response = { accessToken: token, refreshToken: hash };
            result.message = 'usuario autentificado y autorizado';
            return res.status(201).send(result);
        } catch (err) {
            console.log('createJWT error: %O', err);
            result.status = false;
            result.message = 'createJWT error: %O' + err;
            result.response = null;
            return res.status(200).send(result);
        }
    }
}
let authCtrl = new AuthController();
export default authCtrl;
