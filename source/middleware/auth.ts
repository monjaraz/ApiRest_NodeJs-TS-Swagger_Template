import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Json } from '../model/json';
// import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwtype from '../common/types/jwtype';

class auth {
    // secretOrPrivateKey: string =
    // secretOrPublicKey: string = config.token.secretOrPublicKey;
    // options = config.token.options;

    constructo() {}

    // sign = (payload: object, signOptions: object) => {
    //     const jwtSignOptions = Object.assign({}, signOptions, this.options);
    //     return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
    // };

    // async createJWT(req: Request, res: Response) {
    //     try {
    //         const refreshId = req.body.userId + this.secretOrPrivateKey;
    //         const salt = bcrypt.createSecretKey(crypto.randomBytes(16));
    //         const hash = bcrypt.createHmac('sha512', salt).update(refreshId).digest('base64');
    //         req.body.refreshKey = salt.export();
    //         const token = jwt.sign(
    //             req.body,
    //             this.secretOrPrivateKey,
    //             this.options
    //             // jwtSecret, {
    //             // expiresIn: tokenExpirationInSeconds}
    //         );
    //         return res.status(201).send({ accessToken: token, refreshToken: hash });
    //     } catch (err) {
    //         // log('createJWT error: %O', err);
    //         return res.status(500).send();
    //     }
    // }

    // refreshOptions.verify = options you would use with verify function
    // refreshOptions.jwtid = contains the id for the new token
    // refresh = (token: string, refreshOptions: any) => {
    //     const payload = jwt.verify(token, this.secretOrPublicKey, refreshOptions.verify);
    // if (payload != undefined) {
    //     delete payload.iat;
    //     delete payload.exp;
    //     delete payload.nbf;
    //     delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
    // }
    // const jwtSignOptions = Object.assign({}, this.options, { jwtid: refreshOptions.jwtid });
    // The first signing converted all needed options into claims, they are already in the payload
    //     return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
    // };

    // verifyJWTToken = (token: string) => {
    //     return new Promise((resolve, reject) => {
    //         if (!token.startsWith('Bearer')) {
    //             // Reject if there is no Bearer in the token
    //             return reject('Token invalido');
    //         }
    //         // Remove Bearer from string
    //         token = token.slice(7, token.length);
    //         jwt.verify(token, this.secretOrPublicKey, (err, decodedToken) => {
    //             if (err) {
    //                 return reject(err.message);
    //             } // Check the decoded user
    //             if (!decodedToken || !decodedToken.user) {
    //                 return reject('Token invalido');
    //             }
    //             resolve(decodedToken.user);
    //         });
    //     });
    // };

    // jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //     // get token from headers object
    //     let token = req.get('Authorization') || '';
    //     // check token
    //     if (!token) {
    //         res.status(401).send('El Token es invalido');
    //     }
    //     this.verifyJWTToken(token)
    //         .then((user) => {
    //             // put user's information to req object
    //             console.log('req.user = user:' + req + '=' + user);
    //             // call next to finish this middleware function
    //             next();
    //         })
    //         .catch((err) => {
    //             res.status(401).send(err);
    //         });
    // };

    async validRefreshNeeded(req: Request, res: Response, next: NextFunction) {
        // const user: any = await usersService.getUserByEmailWithPassword(res.locals.jwt.email);
        const user: any = {
            _id: 'h4n5010',
            name: 'han',
            email: 'han@gmail.com',
            role: 1
        };
        const salt = crypto.createSecretKey(Buffer.from(res.locals.jwt.refreshKey.data));
        const hash = crypto
            .createHmac('sha512', salt)
            .update(res.locals.jwt.userId + config.token.secretOrPrivateKey)
            .digest('base64');
        if (hash === req.body.refreshToken) {
            console.log('hash:' + hash);
            console.log('req.body.refreshToken:' + req.body.refreshToken);
            req.body = {
                userId: user._id,
                email: user.email,
                role: user.role
            };
            return next();
        } else {
            return res.status(400).send({ errors: ['Invalid refresh token'] });
        }
    }

    verifyRefreshBodyField(req: Request, res: Response, next: NextFunction) {
        if (req.body && req.body.refreshToken) {
            return next();
        } else {
            return res.status(400).send({ errors: ['Missing required field: refreshToken'] });
        }
    }

    validJWTNeeded(req: Request, res: Response, next: NextFunction) {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                console.log('authorization[0])::' + authorization[0]);
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    console.log('this.secretOrPrivateKey:' + config.token.secretOrPrivateKey);
                    res.locals.jwt = jwt.verify(authorization[1], config.token.secretOrPrivateKey) as jwtype;
                    console.log('3');
                    next();
                }
            } catch (err) {
                return res.status(403).send();
            }
        } else {
            return res.status(401).send();
        }
    }
}

let authMidd = new auth();
export default authMidd;
