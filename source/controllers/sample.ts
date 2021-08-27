import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { httpError } from '../handler/handlerError';
import config from '../config/config';

const NAMESPACE = 'Sample Controller';

const sampleHealthCheck = (req: Request, res: Response) => {
    try {
        logging.info(NAMESPACE, 'Sample health check route called.');
    } catch (e) {
        httpError(res, e);
    }
    return res.status(200).json({ message: 'pong' });
};

const sampleSignIn = (req: Request, res: Response) => {
    try {
        logging.info(NAMESPACE, 'Sample signin');
        let { usu, pass } = req.body;
        // if (usu === config.user.name && pass === config.user.pass) {
        //     console.log('usu-pass' + usu + '-' + pass);

        // }
        return res.status(200).json({ message: 'Permisos consedidos para usuario correcto' });
    } catch (e) {
        httpError(res, e);
    }
    return res.status(200).json({ message: 'Acceso no autorizado para usuario incorrecto' });
};

export { sampleHealthCheck, sampleSignIn };
