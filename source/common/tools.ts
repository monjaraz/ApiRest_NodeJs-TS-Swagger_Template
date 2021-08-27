import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { httpError } from '../handler/handlerError';
import { iResult } from '../model/result';

const NAMESPACE = 'Tools';
let result: iResult = {
    status: false,
    message: '',
    response: null
};

const encrypStr = async (password: string): Promise<iResult> => {
    logging.info(NAMESPACE, 'encripta string enviado');
    await bcrypt
        .hash(password, 10)
        .then((salt) => {
            result.status = true;
            result.response = salt;
        })
        .catch((err) => {
            result.status = false;
            result.message = err;
        });
    return result;
};

const comparePass = async (inputPass: string, hashedPass: string): Promise<iResult> => {
    logging.info(NAMESPACE, 'compara password encriptadas');
    logging.info(NAMESPACE, 'pass1::' + inputPass);
    logging.info(NAMESPACE, 'pass2::' + hashedPass);
    await bcrypt
        .compare(inputPass, hashedPass)
        .then((success) => {
            result.status = success;
            result.message = 'contraseñas identicas';
        })
        .catch((err) => {
            result.status = false;
            result.message = err;
        });
    return result;
};

export { encrypStr, comparePass };
